export interface AccountProfile {
  name: string;
  role: string;
  location: string;
  memberSince: string;
  avatarUrl: string;
  bio: string;
  rating: number;
  reviewsCount: number;
}

export interface AccountStat {
  label: string;
  value: string;
  containerClass: string;
}

export interface AccountBadgeItem {
  title: string;
  description: string;
  iconClass: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface GalleryCategory {
  title: string;
  iconClass: string;
  photos: GalleryPhoto[];
}

export interface AccountReview {
  name: string;
  timeAgo: string;
  rating: number;
  comment: string;
  propertyName: string;
  avatarUrl: string;
}
