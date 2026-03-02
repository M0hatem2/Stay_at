# Rent Component API Update

## Overview
Updated the rent component to use the new API response structure that returns `ApiProperty` objects directly instead of custom `Unit` objects.

## Changes Made

### 1. Response Structure Update
Changed from `response.units` to `response.results` to match the actual API response:

```typescript
// Before
response.units.data
response.units.totalItems
response.units.currentPage
response.units.itemsPerPage

// After
response.results.data
response.results.totalItems
response.results.currentPage
response.results.itemsPerPage
```

### 2. Data Type Change
The API now returns `ApiProperty[]` directly instead of custom `Unit[]`:

```typescript
// Before
units: Unit[] = [];

// After
units: ApiProperty[] = [];
```

### 3. Removed Unit Conversion
Since the API returns `ApiProperty` objects directly, removed the `convertUnitToApiProperty()` method and updated the template:

```html
<!-- Before -->
<app-units-card [property]="convertUnitToApiProperty(unit)" />

<!-- After -->
<app-units-card [property]="unit" />
```

### 4. Updated Service Interface
Updated `UnitsResponse` to use `ApiProperty[]`:

```typescript
export interface UnitsResponse {
  message: string;
  results: {
    data: ApiProperty[];  // Changed from Unit[]
    pages: number;
    currentPage: string | number;
    totalItems: number;
    itemsPerPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}
```

### 5. CurrentPage Type Conversion
Added type conversion for `currentPage` since the API can return it as a string:

```typescript
this.currentPage =
  typeof response.results.currentPage === 'string'
    ? parseInt(response.results.currentPage)
    : response.results.currentPage;
```

## API Endpoint
The component uses: `GET /public/search/units-and-properties?purpose=rent`

## Response Structure
```json
{
  "message": "تم جلب نتايج البحث بنجاح",
  "results": {
    "data": [
      {
        "_id": "69a46cdd639e4e90ec0162be",
        "targetId": "69a382701e7c4ac111d07c88",
        "area": 150,
        "bathrooms": 2,
        "bedrooms": 2,
        "currency": "EGP",
        "displayPrice": 5000000,
        "furnished": true,
        "isFeatured": false,
        "isTrusted": false,
        "location": {...},
        "priceType": "total",
        "purpose": "sale_and_rent",
        "slug": "a303",
        "targetType": "unit",
        "thumbnail": {
          "secure_url": "https://..."
        },
        "title": "ثالث وحدة",
        "type": "شقة"
      }
    ],
    "pages": 1,
    "currentPage": 1,
    "totalItems": 3,
    "itemsPerPage": 3,
    "nextPage": null,
    "previousPage": null
  }
}
```

## Files Modified
- `src/app/features/rent/components/rent/rent.ts` - Changed units type to ApiProperty[], removed conversion method
- `src/app/features/rent/components/rent/rent.html` - Removed convertUnitToApiProperty() call
- `src/app/features/rent/services/unit.service.ts` - Updated UnitsResponse interface to use ApiProperty[]

## Benefits
- Simpler code - no need for data conversion
- Direct compatibility with units-card component
- Consistent with all-properties implementation
- Supports all new API fields (thumbnail, displayPrice, currency, priceType, etc.)

## Testing
After this update:
- Rent page displays property cards correctly with images, titles, prices, and areas
- Pagination works with the new structure
- Load more functionality appends results properly
- No TypeScript errors
- All filters work correctly

## Related Changes
This update aligns with the same fix applied to the all-properties component in TASK 6.
