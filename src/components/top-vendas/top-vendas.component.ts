import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

interface IResponseTopVendas {
  storeName: string;
  totalBilled: number | string;
  quantitySold: number;
  userName: string;
  userRole: string;
  userImg: string;
  id: string;
}

@Component({
  selector: 'app-top-vendas',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule, LayoutDashboardComponent],
  templateUrl: './top-vendas.component.html',
  styleUrl: './top-vendas.component.scss'
})
export class TopVendasComponent implements OnInit{
  
  constructor(private readonly httpClient: HttpClient) {}

  storeId = localStorage.getItem('store_id');
  
  dataArray: IResponseTopVendas[] = [];

  ngOnInit() {
    this.getAllTopVendas();
  }

  getAllTopVendas() {
    this.httpClient.get<IResponseTopVendas[]>(`${environment.apiProd}/${environment.salesTopUser}/${this.storeId}`)
    .subscribe((response) => {
      this.dataArray = response;
    })
  }
}
