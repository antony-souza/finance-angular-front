import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { ChartBaseComponent } from '../charts/charts.component';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { environment } from '../../../environment/environment';
import { GenerateXlsxService } from '../../utils/generateXlsx/generate-xlsx.service';

@Component({
  selector: 'app-productbilling',
  standalone: true,
  imports: [CommonModule, ChartBaseComponent, ...MATERIAL_COMPONENTS, LayoutDashboardComponent],
  templateUrl: './productbilling.component.html',
  styleUrl: './productbilling.component.scss'
})
export class ProductbillingComponent {

  constructor(private readonly xlsxService: GenerateXlsxService) {}

  generateXlsx() {
    this.xlsxService.generateExcel(environment.generateExcelToBillings, 'faturamento-produtos');
  }
  
}
