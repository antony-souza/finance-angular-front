import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';


interface ISalesHistory {
  storeName: string;
  totalBilled: number | string;
  quantitySold: number;
  date: string;
  hour: string;
  productName: string;
  productImg: string;
  userName: string;
  userRole: string;
  userImg: string;
}

@Component({
  selector: 'app-saleshistory',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent, ...MATERIAL_COMPONENTS],
  templateUrl: './saleshistory.component.html',
  styleUrls: ['./saleshistory.component.scss'],
})
export class SaleshistoryComponent implements OnInit {
  salesHistory: ISalesHistory[] = [];

  constructor(private readonly httpClient: HttpClient) {}

  storeId = localStorage.getItem('store_id');

  ngOnInit(): void {
    this.httpClient
      .get<ISalesHistory[]>(
        `${environment.apiProd}/${environment.salesAll}/${this.storeId}`
      )
      .subscribe((response) => {
        this.salesHistory = response
      });
  }

  generateExcel() {
    this.httpClient
      .get(`${environment.apiProd}/${environment.generateExcelToSales}/${this.storeId}`, { responseType: 'blob' })
      .subscribe((response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sales.xlsx';
        a.click(); 
        window.URL.revokeObjectURL(url);
      });
  }
  
}
