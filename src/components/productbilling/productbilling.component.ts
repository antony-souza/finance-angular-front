import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';

@Component({
  selector: 'app-productbilling',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent, CommonModule, ...MATERIAL_COMPONENTS],
  templateUrl: './productbilling.component.html',
  styleUrl: './productbilling.component.scss'
})
export class ProductbillingComponent {

}
