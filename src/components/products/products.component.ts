import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogPutProductsComponent } from './dialog-put-products/dialog-put-products.component';
import { formatPrice } from '../../utils/formatMoney/format-price.service';
interface IProductResponse {
  product_id: string;
  product_name: string;
  product_price: number;
  product_description: string;
  product_image_url: string;
  product_quantity: number;
  category_name: string;
  store_id: string;
  store_name: string;
  formatted_price?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule, LayoutDashboardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: IProductResponse[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.httpClient.get<IProductResponse[]>(`${environment.host}:${environment.port}/${environment.getAllProductsByStore}/${localStorage.getItem('store_id')}`)
      .subscribe((response) => {
        this.products = response.map((product) => ({
          ...product,
          formatted_price: formatPrice(product.product_price)
        }))
      });
  }

  openDialogPutProducts(product_id: string) {
    const dialogRef = this.dialog.open(DialogPutProductsComponent, {
      width: '400px',
      data: { id: product_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  
}
