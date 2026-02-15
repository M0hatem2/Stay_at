// Models based on API response structure from /property endpoint

export interface GalleryItem {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  original_filename: string;
  _id: string;
}

export interface DocumentItem {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  original_filename: string;
  _id: string;
}

export interface Coordinates {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface PropertyLocation {
  country: string;
  city: string;
  area: string;
  address: string;
  coordinates: Coordinates;
}

export interface ApiProperty {
  _id: string;
  slug: string;
  status: 'active' | 'inactive' | 'pending';
  ownerType: 'real_estate_developer' | 'broker' | 'owner';
  ownerId: string;
  projectId?: string;
  location: PropertyLocation;
  isFeatured: boolean;
  gallery: GalleryItem[];
  documents: DocumentItem[];
  floorsCount: number;
  name: string;
  description: string;
  type: string;
  facilitiesAndServices: string[];
}

export interface PaginationInfo {
  data: ApiProperty[];
  pages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface PropertiesResponse {
  message: string;
  properties: PaginationInfo;
}

export interface SinglePropertyResponse {
  message: string;
  property: ApiProperty;
}
