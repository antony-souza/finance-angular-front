import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { ChartBaseComponent } from '../charts/charts.component';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productbilling',
  standalone: true,
  imports: [CommonModule, ChartBaseComponent, ...MATERIAL_COMPONENTS, LayoutDashboardComponent],
  templateUrl: './productbilling.component.html',
  styleUrl: './productbilling.component.scss'
})
export class ProductbillingComponent {

  constructor(private httpClient: HttpClient) {}

  storeId = localStorage.getItem('store_id');

  generateExcel() {
      this.httpClient
        .get(`${environment.apiProd}/${environment.productbilling}/${this.storeId}`, { responseType: 'blob' })
        .subscribe((response) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'faturamento.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        });
    }
}
