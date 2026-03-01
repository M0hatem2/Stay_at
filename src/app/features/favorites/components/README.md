# Favorites Components

This directory contains all the components used in the Favorites feature, organized into separate, reusable components.

## Components Structure

### 1. FavoritesHeaderComponent (`favorites-header/`)
- **Purpose**: Displays the main header with title, description, and statistics cards
- **Features**:
  - Gradient background with animated blur effects
  - Statistics cards showing total favorites, units, and projects
  - FontAwesome icons for better visual appeal
  - Responsive design

### 2. FavoritesFilterComponent (`favorites-filter/`)
- **Purpose**: Provides filtering and sorting functionality
- **Features**:
  - Filter buttons (All, Units, Projects) with dynamic counts
  - Sort dropdown (Recent, Price Low to High, Price High to Low)
  - Active state styling with gradient backgrounds
  - FontAwesome icons for each filter option

### 3. FavoritesEmptyStateComponent (`favorites-empty-state/`)
- **Purpose**: Shows when user has no favorites
- **Features**:
  - Engaging empty state design
  - Call-to-action button to browse properties
  - Additional helpful links (Popular Areas, Featured Properties, Hot Deals)
  - Hover effects and animations

### 4. FavoritesListComponent (`favorites-list/`)
- **Purpose**: Displays the list of favorite properties/projects
- **Features**:
  - Grid layout with responsive design
  - Property cards with images, details, and actions
  - Loading state with skeleton placeholders
  - Remove from favorites functionality
  - Type badges (Unit/Project)
  - Price formatting and property details

## Usage

```typescript
import { 
  FavoritesHeaderComponent,
  FavoritesFilterComponent,
  FavoritesEmptyStateComponent,
  FavoritesListComponent,
  FilterType,
  SortType,
  FavoriteItem
} from './components';
```

## Data Types

### FilterType
```typescript
type FilterType = 'all' | 'units' | 'projects';
```

### SortType
```typescript
type SortType = 'recent' | 'price-low' | 'price-high';
```

### FavoriteItem
```typescript
interface FavoriteItem {
  id: string;
  type: 'unit' | 'project';
  title: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  dateAdded: Date;
}
```

## Styling

All components use:
- **FontAwesome icons** for consistent iconography
- **Tailwind CSS** for styling
- **Gradient backgrounds** with brand colors (#C4A962, #D4B972)
- **Hover effects** and smooth transitions
- **Responsive design** for mobile and desktop

## Features

- ✅ Modular component architecture
- ✅ FontAwesome icons integration
- ✅ Responsive design
- ✅ Loading states
- ✅ Empty states
- ✅ Interactive filtering and sorting
- ✅ Smooth animations and transitions
- ✅ TypeScript support
- ✅ Standalone components (Angular 17+)