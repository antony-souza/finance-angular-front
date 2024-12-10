import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent { }