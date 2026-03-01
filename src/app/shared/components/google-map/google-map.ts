import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-google-map',
  imports: [],
  templateUrl: './google-map.html',
  styleUrl: './google-map.scss',
})
export class GoogleMap implements OnInit, OnChanges, AfterViewInit {
  @Input() latitude: number = 30.0444; // Default: Cairo
  @Input() longitude: number = 31.2357;
  @Input() propertyName: string = '';
  @Input() propertyAddress: string = '';
  @Input() propertyImage: string = '';

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => this.initMap(), 100);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map && (changes['latitude'] || changes['longitude'])) {
      this.updateMapLocation();
    }
  }

  private initMap() {
    if (!this.isBrowser) return;

    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    this.map = L.map('map').setView([this.latitude, this.longitude], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.addMarker();
  }

  private updateMapLocation() {
    if (!this.map) return;

    this.map.setView([this.latitude, this.longitude], 14);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.addMarker();
  }

  private addMarker() {
    if (!this.map) return;

    // استخدام صورة افتراضية إذا لم تكن هناك صورة أو كانت فارغة
    const hasValidImage = this.propertyImage && this.propertyImage.trim() !== '';

    const popupContent = `
      <div style="width:200px; text-align: center;">
        ${
          hasValidImage
            ? `
          <img 
            src="${this.propertyImage}" 
            alt="${this.propertyName || 'موقع العقار'}"
            style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom: 8px; background: #f3f4f6;"
            onerror="this.style.display='none'"
          />
        `
            : `
          <div style="width:100%; height:120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:8px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        `
        }
        <h4 style="margin:8px 0 4px; font-weight: bold; color: #333; font-size: 14px;">${this.propertyName || 'موقع العقار'}</h4>
        ${this.propertyAddress ? `<p style="font-size:12px; color: #666; margin: 4px 0; line-height: 1.4;">${this.propertyAddress}</p>` : ''}
      </div>
    `;

    this.marker = L.marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup(popupContent, { maxWidth: 220 })
      .openPopup();
  }
}
