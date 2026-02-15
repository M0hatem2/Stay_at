import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.html',
  styleUrls: ['./my-properties.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class MyPropertiesComponent {}
