import { Component } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';

@Component({
  selector: 'app-sheets',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule, LayoutDashboardComponent],
  templateUrl: './sheets.component.html',
  styleUrl: './sheets.component.scss'
})
export class SheetsComponent {

}
