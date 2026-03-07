import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../core/models/project.model';
import { LanguageService } from '../../../../core/services/language.service';
import { ProjectsCard } from '../../../../shared/components/projects-card/projects-card';
import { environment } from '../../../../../environments/environment';

interface ProjectSearchApiResponse {
  message: string;
  results: {
    data: ProjectSearchItem[];
    pages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

interface ProjectSearchItem {
  _id?: string;
  entityType?: string;
  type?: string;
  project?: {
    name?: string;
    type?: string | string[];
    priceStart?: number | string;
    deliveryDate?: string;
    plannedUnits?: number | string;
    location?: string;
  };
  profile?: {
    name?: string;
  };
  developer?: {
    name?: string;
  };
  owner?: {
    name?: string;
  };
  thumbnail?: string | { secure_url?: string };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectsCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, OnChanges {
  @Input() searchQuery = '';
  @Input() searchVersion = 0;

  isLoading = false;
  errorMessage = '';

  private readonly baseUrl = environment.api.baseUrl;
  private readonly fallbackImage =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop';
  projects: Project[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchVersion'] && !changes['searchVersion'].firstChange) {
      this.loadProjects();
    }
  }

  retrySearch(): void {
    this.loadProjects();
  }

  onProjectClick(project: Project): void {
    this.router.navigate(['/projects', project.id], {
      state: { property: project },
    });
  }

  private loadProjects(): void {
    const query = this.searchQuery.trim();
    const currentLanguage = this.languageService.getCurrentLanguage();

    const headers = {
      'Accept-Language': currentLanguage,
      'Content-Language': currentLanguage,
      'X-Language': currentLanguage,
    };

    let params = new HttpParams();
    if (query) {
      params = params.set('name', query);
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<ProjectSearchApiResponse>(`${this.baseUrl}/public/search/projects-and-profiles`, {
        params,
        headers,
      })
      .subscribe({
        next: (response) => {
          const mappedProjects = this.mapApiResults(response?.results?.data || []);
          this.projects = mappedProjects;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load projects. Please try again.';
          this.projects = [];
        },
      });
  }

  private mapApiResults(items: ProjectSearchItem[]): Project[] {
    return items
      .filter((item) => {
        const entityType = String(item?.entityType || item?.type || '').toLowerCase();
        return entityType === 'project' && !!item?.project;
      })
      .map((item) => {
        const projectData = item.project || {};
        const rawImage = this.resolveThumbnail(item);

        return {
          id: String(item?._id || ''),
          name: projectData.name || 'Untitled Project',
          developer: this.resolveDeveloperName(item),
          location: projectData.location || 'Location not specified',
          imageUrl: rawImage || this.fallbackImage,
          deliveryDate: this.formatDeliveryDate(projectData.deliveryDate),
          unitTypes: this.normalizeUnitTypes(projectData.type),
          startingPrice: this.toNumber(projectData.priceStart),
          totalUnits: this.toNumber(projectData.plannedUnits),
        };
      });
  }

  private resolveDeveloperName(item: ProjectSearchItem): string {
    return item?.developer?.name || item?.owner?.name || item?.profile?.name || 'Developer';
  }

  private resolveThumbnail(item: ProjectSearchItem): string {
    const thumb = item?.thumbnail;
    if (typeof thumb === 'string' && thumb.trim()) return thumb.trim();
    if (thumb && typeof thumb === 'object' && thumb.secure_url) return thumb.secure_url;
    return this.fallbackImage;
  }

  private normalizeUnitTypes(value: string | string[] | undefined): string[] {
    if (Array.isArray(value)) {
      const list = value.map((item) => String(item).trim()).filter(Boolean);
      return list.length ? list : ['Project'];
    }

    if (typeof value === 'string' && value.trim()) {
      return [value.trim()];
    }

    return ['Project'];
  }

  private formatDeliveryDate(value: string | undefined): string {
    if (!value) return 'TBD';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return String(date.getFullYear());
  }

  private toNumber(value: number | string | undefined): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = Number(value.replace(/[^\d.-]/g, ''));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return 0;
  }
}
