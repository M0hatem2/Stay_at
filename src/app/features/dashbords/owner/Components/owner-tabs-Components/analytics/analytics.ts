import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AnalyticsComponent {}
