import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutOptionsComponent } from '../layout-options/layout-options.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutOptionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent { }