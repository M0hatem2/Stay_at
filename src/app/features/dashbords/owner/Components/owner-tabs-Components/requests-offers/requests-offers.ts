import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Property {
  id: number;
  title: string;
  location: string;
}

interface Request {
  id: number;
  user: User;
  property: Property;
  type: 'rent' | 'sale';
  requestedPrice: number;
  budget: number;
  moveInDate: Date;
  occupants: number;
  message: string;
  date: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

interface Offer {
  id: number;
  user: User;
  property: Property;
  type: 'rent' | 'sale';
  amount: number;
  expirationDate: Date;
  isCounterOffer: boolean;
  message: string;
  date: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

@Component({
  selector: 'app-requests-offers',
  templateUrl: './requests-offers.html',
  styleUrls: ['./requests-offers.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class RequestsOffersComponent implements OnInit {
  activeTab: 'requests' | 'offers' = 'requests';

  // Sample data
  requests: Request[] = [
    {
      id: 1,
      user: {
        id: 101,
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop',
      },
      property: {
        id: 1,
        title: 'Modern 3-Bedroom Apartment',
        location: 'Downtown, City Center',
      },
      type: 'rent',
      requestedPrice: 1800,
      budget: 2000,
      moveInDate: new Date(2024, 7, 1),
      occupants: 2,
      message: 'Looking for a quiet apartment with good amenities. Prefer ground floor.',
      date: new Date(2024, 6, 15),
      status: 'pending',
    },
    {
      id: 2,
      user: {
        id: 102,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop',
      },
      property: {
        id: 2,
        title: 'Luxury Villa with Garden',
        location: 'Green Hills, Suburb',
      },
      type: 'sale',
      requestedPrice: 800000,
      budget: 850000,
      moveInDate: new Date(2024, 9, 15),
      occupants: 4,
      message: 'Interested in this property. Can we schedule a viewing?',
      date: new Date(2024, 6, 10),
      status: 'accepted',
    },
    {
      id: 3,
      user: {
        id: 103,
        name: 'Mike Wilson',
        email: 'mike.w@example.com',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
      },
      property: {
        id: 3,
        title: 'Cozy 2-Bedroom House',
        location: 'Quiet Neighborhood',
      },
      type: 'rent',
      requestedPrice: 1200,
      budget: 1500,
      moveInDate: new Date(2024, 8, 1),
      occupants: 3,
      message: 'Need a pet-friendly property. Do you allow pets?',
      date: new Date(2024, 6, 5),
      status: 'pending',
    },
  ];

  offers: Offer[] = [
    {
      id: 1,
      user: {
        id: 104,
        name: 'Emily Brown',
        email: 'emily.b@example.com',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
      },
      property: {
        id: 4,
        title: 'Commercial Space for Rent',
        location: 'Business District',
      },
      type: 'rent',
      amount: 2800,
      expirationDate: new Date(2024, 7, 30),
      isCounterOffer: false,
      message: 'I would like to rent this space for my business. Can we discuss the terms?',
      date: new Date(2024, 6, 20),
      status: 'pending',
    },
    {
      id: 2,
      user: {
        id: 105,
        name: 'David Lee',
        email: 'david.l@example.com',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      },
      property: {
        id: 5,
        title: 'Penthouse with City View',
        location: 'Sky Tower, Downtown',
      },
      type: 'sale',
      amount: 1150000,
      expirationDate: new Date(2024, 7, 15),
      isCounterOffer: true,
      message: 'I can offer $1.15M for this property. Is this acceptable?',
      date: new Date(2024, 6, 18),
      status: 'rejected',
    },
  ];

  properties: Property[] = [
    { id: 1, title: 'Modern 3-Bedroom Apartment', location: 'Downtown, City Center' },
    { id: 2, title: 'Luxury Villa with Garden', location: 'Green Hills, Suburb' },
    { id: 3, title: 'Cozy 2-Bedroom House', location: 'Quiet Neighborhood' },
    { id: 4, title: 'Commercial Space for Rent', location: 'Business District' },
    { id: 5, title: 'Penthouse with City View', location: 'Sky Tower, Downtown' },
  ];

  // Filters
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedProperty: string = 'all';
  sortBy: string = 'date_desc';

  // Pagination
  currentPageRequests: number = 1;
  currentPageOffers: number = 1;
  itemsPerPage: number = 4;

  // Filtered data
  filteredRequests: Request[] = [];
  filteredOffers: Offer[] = [];
  paginatedRequests: Request[] = [];
  paginatedOffers: Offer[] = [];

  ngOnInit(): void {
    this.filterData();
  }

  switchTab(tab: 'requests' | 'offers'): void {
    this.activeTab = tab;
    this.currentPageRequests = 1;
    this.currentPageOffers = 1;
    this.filterData();
  }

  filterData(): void {
    this.filterRequests();
    this.filterOffers();
  }

  filterRequests(): void {
    let filtered = [...this.requests];

    // Search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          request.user.name.toLowerCase().includes(searchLower) ||
          request.property.title.toLowerCase().includes(searchLower) ||
          request.property.location.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter((request) => request.status === this.selectedStatus);
    }

    // Property filter
    if (this.selectedProperty !== 'all') {
      filtered = filtered.filter(
        (request) => request.property.id === parseInt(this.selectedProperty)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'date_desc':
          return b.date.getTime() - a.date.getTime();
        case 'date_asc':
          return a.date.getTime() - b.date.getTime();
        case 'amount_desc':
          return b.requestedPrice - a.requestedPrice;
        case 'amount_asc':
          return a.requestedPrice - b.requestedPrice;
        default:
          return 0;
      }
    });

    this.filteredRequests = filtered;
    this.currentPageRequests = 1;
    this.updateRequestsPagination();
  }

  filterOffers(): void {
    let filtered = [...this.offers];

    // Search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (offer) =>
          offer.user.name.toLowerCase().includes(searchLower) ||
          offer.property.title.toLowerCase().includes(searchLower) ||
          offer.property.location.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter((offer) => offer.status === this.selectedStatus);
    }

    // Property filter
    if (this.selectedProperty !== 'all') {
      filtered = filtered.filter((offer) => offer.property.id === parseInt(this.selectedProperty));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'date_desc':
          return b.date.getTime() - a.date.getTime();
        case 'date_asc':
          return a.date.getTime() - b.date.getTime();
        case 'amount_desc':
          return b.amount - a.amount;
        case 'amount_asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    this.filteredOffers = filtered;
    this.currentPageOffers = 1;
    this.updateOffersPagination();
  }

  updateRequestsPagination(): void {
    const startIndex = (this.currentPageRequests - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(startIndex, endIndex);
  }

  updateOffersPagination(): void {
    const startIndex = (this.currentPageOffers - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOffers = this.filteredOffers.slice(startIndex, endIndex);
  }

  onSearch(): void {
    this.filterData();
  }

  onFilterChange(): void {
    this.filterData();
  }

  onSortChange(): void {
    this.filterData();
  }

  changePage(page: number): void {
    if (this.activeTab === 'requests') {
      if (page >= 1 && page <= this.totalPagesRequests) {
        this.currentPageRequests = page;
        this.updateRequestsPagination();
      }
    } else {
      if (page >= 1 && page <= this.totalPagesOffers) {
        this.currentPageOffers = page;
        this.updateOffersPagination();
      }
    }
  }

  get totalPagesRequests(): number {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }

  get totalPagesOffers(): number {
    return Math.ceil(this.filteredOffers.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages =
      this.activeTab === 'requests' ? this.totalPagesRequests : this.totalPagesOffers;
    const currentPage =
      this.activeTab === 'requests' ? this.currentPageRequests : this.currentPageOffers;

    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  getRequestStatusClass(status: string): string {
    return status;
  }

  getOfferStatusClass(status: string): string {
    return status;
  }

  acceptRequest(id: number): void {
    console.log('Accept request:', id);
  }

  rejectRequest(id: number): void {
    console.log('Reject request:', id);
  }

  makeCounterOffer(id: number): void {
    console.log('Make counter offer for request:', id);
  }

  acceptOffer(id: number): void {
    console.log('Accept offer:', id);
  }

  rejectOffer(id: number): void {
    console.log('Reject offer:', id);
  }

  viewDetails(id: number): void {
    console.log('View request details:', id);
  }

  viewOfferDetails(id: number): void {
    console.log('View offer details:', id);
  }

  createNewOffer(): void {
    console.log('Create new offer');
  }
}
