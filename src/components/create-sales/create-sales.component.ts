 
import { Component, inject, OnInit } from '@angular/core';
import { LayoutOptionsComponent } from '../layout-options/layout-options.component';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

interface IProductResponse {
  id: string;
  name: string;
}

@Component({
  selector: 'app-create-sales',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS,LayoutOptionsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-sales.component.html',
  styleUrl: './create-sales.component.scss' 
})
export class CreateSalesComponent implements OnInit{

  products: IProductResponse[] =  [] as  IProductResponse[]
  private form = inject(FormBuilder)
  private validadtors = Validators

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
      this.httpClient
        .post(`${environment.host}:${environment.port}/${environment.salesCreate}`, this.formSales.value)
        .subscribe({
          next: () => {
            this.formSales.reset();
          }
        })
    }
  }

  loadProducts() {
    this.httpClient
      .get<IProductResponse[]>(`${environment.host}:${environment.port}/${environment.allproducts}/${localStorage.getItem('store_id')}`)
      .subscribe({
        next: (response) => {
          this.products = response;
        }
      });
  }
}
