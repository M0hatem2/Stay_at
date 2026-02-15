import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

 

@Component({
  selector: 'app-financial',
  templateUrl: './financial.html',
  styleUrls: ['./financial.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class FinancialComponent {}