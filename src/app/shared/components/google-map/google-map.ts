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

    const popupContent = `
      <div style="width:200px; text-align: center;">
        ${
          this.propertyImage
            ? `<img 
          src="${this.propertyImage}" 
          style="width:100%; height:120px; object-fit:cover; border-radius:8px"
        />`
            : ''
        }
        <h4 style="margin:8px 0 4px; font-weight: bold;">${this.propertyName || 'موقع العقار'}</h4>
        ${this.propertyAddress ? `<p style="font-size:13px; color: #666;">${this.propertyAddress}</p>` : ''}
      </div>
    `;

    this.marker = L.marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup(popupContent)
      .openPopup();
  }
}
