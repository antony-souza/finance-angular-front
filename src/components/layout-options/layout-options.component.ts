import { Component, inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-options',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule, HeaderComponent],
  templateUrl: './layout-options.component.html',
  styleUrls: ['./layout-options.component.scss']
})
export class LayoutOptionsComponent {

  router = inject(Router);

  handleNavigateToCreateSales() {
    this.router.navigate(['/createsales']);
  }

  handleNavigateToHistoryPayments() {
    this.router.navigate(['/saleshistory']);
  }

  handleNavigateToProductBilling() {
    this.router.navigate(['/productbilling']);
  }

 
}
