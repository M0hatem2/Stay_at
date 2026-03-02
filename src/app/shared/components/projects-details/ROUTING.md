# Project Details Routing Guide

## Overview
This document explains how the routing works when clicking on a project card to navigate to the project details page.

## Flow Diagram

```
User clicks on Project Card
         ↓
onProjectClick(project) is triggered
         ↓
Router navigates to /projects/:id
         ↓
ProjectsDetails component loads
         ↓
ngOnInit() retrieves project data from state
         ↓
Project details are displayed
```

## Implementation Details

### 1. Project Card Click Handler

**File**: `src/app/features/projects/components/projects/projects.ts`

```typescript
onProjectClick(project: Project): void {
  this.router.navigate(['/projects', project.id], {
    state: { property: project },
  });
}
```

**What happens:**
- User clicks on a project card
- `onProjectClick()` is called with the project data
- Router navigates to `/projects/{project.id}`
- Project data is passed via `state` object

### 2. Route Configuration

**File**: `src/app/app.routes.ts`

```typescript
{
  path: 'projects/:id',
  component: ProjectsDetails,
  data: { prerender: false },
}
```

**What happens:**
- Route matches `/projects/:id` pattern
- `ProjectsDetails` component is loaded
- `:id` is a dynamic parameter (project ID)

### 3. Receiving Data in ProjectsDetails

**File**: `src/app/shared/components/projects-details/projects-details.ts`

```typescript
ngOnInit(): void {
  // Get project data from navigation state
  const navigation = this.router.getCurrentNavigation();
  const navState = navigation?.extras.state as { property?: Project } | undefined;

  if (navState?.property) {
    this.applyProjectData(navState.property);
    return;
  }

  // Fallback: check window.history.state for browser refresh
  if (typeof window !== 'undefined') {
    const histState = (window.history?.state as { property?: Project }) || {};
    if (histState?.property) {
      this.applyProjectData(histState.property);
    }
  }
}
```

**What happens:**
- Component initializes
- Tries to get project data from navigation state
- If not found (e.g., page refresh), checks browser history state
- Applies project data to component properties

### 4. Applying Project Data

```typescript
private applyProjectData(project: Project): void {
  this.projectName = project.name || this.projectName;
  this.developer = project.developer || this.developer;
  this.location = project.location || this.location;
  this.deliveryDate = project.deliveryDate || this.deliveryDate;
  this.totalUnits = project.totalUnits?.toString() || this.totalUnits;
  
  if (project.imageUrl) {
    this.masterplanImage = project.imageUrl;
    this.galleryImages = [project.imageUrl, ...this.galleryImages.slice(1)];
  }

  if (project.unitTypes && project.unitTypes.length > 0) {
    this.unitTypeNames = project.unitTypes;
  }

  if (project.startingPrice) {
    const formattedPrice = `From ${project.startingPrice.toLocaleString()} EGP`;
    this.unitTypes = this.unitTypes.map((unit, index) => ({
      ...unit,
      price: index === 0 ? formattedPrice : unit.price,
    }));
  }
}
```

**What happens:**
- Project data is mapped to component properties
- Default values are used if data is missing
- Images and prices are formatted appropriately

## Project Model

**File**: `src/app/core/models/project.model.ts`

```typescript
export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  imageUrl: string;
  deliveryDate: string;
  unitTypes: string[];
  startingPrice: number;
  totalUnits: number;
}
```

## Testing the Flow

### 1. Navigate to Projects Page
```
http://localhost:4200/projects
```

### 2. Click on Any Project Card
- Should navigate to `/projects/{id}`
- Project details should be displayed
- Data should match the clicked project

### 3. Test Browser Refresh
- Click on a project card
- Refresh the page (F5)
- Data should persist (from history state)

## Troubleshooting

### Issue: Data not showing after navigation
**Solution**: Check that `state: { property: project }` is being passed in the navigate call

### Issue: Data lost after page refresh
**Solution**: Implement a service to fetch project data by ID from API or local storage

### Issue: Wrong component displayed
**Solution**: Verify route configuration in `app.routes.ts`

## Future Enhancements

1. **API Integration**: Fetch project data from backend API using project ID
2. **Loading State**: Add loading spinner while fetching data
3. **Error Handling**: Handle cases where project is not found
4. **SEO**: Add meta tags for better search engine optimization
5. **Breadcrumbs**: Add navigation breadcrumbs (Home > Projects > Project Name)

## Related Files

- `src/app/features/projects/components/projects/projects.ts` - Project list component
- `src/app/features/projects/components/projects/projects.html` - Project list template
- `src/app/shared/components/projects-details/projects-details.ts` - Project details component
- `src/app/shared/components/projects-details/projects-details.html` - Project details template
- `src/app/app.routes.ts` - Application routes configuration
- `src/app/core/models/project.model.ts` - Project data model