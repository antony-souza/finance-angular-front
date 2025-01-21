import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { formatPrice } from '../../utils/formatMoney/format-price.service';


interface IDeliveryResponse {
  id: string
  productImg: string
  productName: string
  quantitySold: number
  totalBilled:  number
  totalBillendFormatted: string
  deliveryDate: string
  clientName: string
  deliveryAddress: string
}

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule, LayoutDashboardComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit{

  constructor(private readonly httpClient: HttpClient){}

  deliveryData: IDeliveryResponse[] = [];
  storeId = localStorage.getItem('store_id');

  ngOnInit(): void {
    this.loadDeliveryData();
  }

  loadDeliveryData() {
    this.httpClient.get<IDeliveryResponse[]>(`${environment.apiProd}/${environment.getAllDeliverys}/${this.storeId}`)
      .subscribe((response) => {
        this.deliveryData = response.map((delivery) => ({
          ...delivery,
          totalBillendFormatted: formatPrice(delivery.totalBilled)
        }))

      });
  }
}
