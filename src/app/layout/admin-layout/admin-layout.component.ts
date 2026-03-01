import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../shared/components/navbar/navbar";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {}
