 
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';

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
}

@Component({
  selector: 'app-create-sales',
  standalone: true,
  imports: [LayoutDashboardComponent, CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
  templateUrl: './create-sales.component.html',
  styleUrl: './create-sales.component.scss' 
})
export class CreateSalesComponent implements OnInit{

  products: IProductResponse[] =  [] as  IProductResponse[]
  private form = inject(FormBuilder)
  private validadtors = Validators
  isLoading = false

  protected formSales = this.form.group({
    product_id: ['', [this.validadtors.required]],
    quantity_sold: [0, [this.validadtors.required, this.validadtors.min(1)]],
    date: ['', [this.validadtors.required]],
    store_id: [localStorage.getItem('store_id')],
    user_id: [localStorage.getItem('user_id')]
  })

  constructor(private readonly httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  onSubmitSales() {
    if (this.formSales.valid) {
      this.isLoading = true;
      this.httpClient
        .post(`${environment.apiProd}/${environment.salesCreate}`, this.formSales.value)
        .subscribe({
          next: () => {
            this.formSales.reset();
            this.isLoading = false;
          }
        })
    }
  }

  loadProducts() {
    this.httpClient
      .get<IProductResponse[]>(`${environment.apiProd}/${environment.getAllProductsByStore}/${localStorage.getItem('store_id')}`)
      .subscribe({
        next: (response) => {
          this.products = response;
        }
      });
  }
}
