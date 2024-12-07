import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { formatPrice } from '../../utils/formatMoney/format-price.service';

interface ISalesHistory {
  store_name: string;
  total_billed: number | string;
  quantity_sold: number;
  product_name: string;
  product_image: string;
  user_name: string;
  user_image: string;
}

@Component({
  selector: 'app-saleshistory',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent, CommonModule, ...MATERIAL_COMPONENTS],
  templateUrl: './saleshistory.component.html',
  styleUrl: './saleshistory.component.scss'
})
export class SaleshistoryComponent implements OnInit {

  salesHistory: ISalesHistory[] = []

  constructor(private readonly httpClient: HttpClient) { }

  storeId = localStorage.getItem('store_id');

  ngOnInit(): void {
    this.httpClient.get<ISalesHistory[]>(`${environment.host}:${environment.port}/${environment.salesAll}/${this.storeId}`).subscribe((response) => {
      this.salesHistory = response;
      this.salesHistory.map((sale) => {
        sale.total_billed = formatPrice(sale.total_billed as number);
      });
      console.log(this.salesHistory)
    });
  }

}
