import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { MatDialogRef } from '@angular/material/dialog';

interface ICategoriesResponse {
  id: string;
  name: string;
}

@Component({
  selector: 'app-dialog-post-products',
  templateUrl: './dialog-post-products.component.html',
  styleUrls: ['./dialog-post-products.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
})
export class DialogPostProductsComponent implements OnInit {

  private selectedFile: File | null = null;
  categories: ICategoriesResponse[] = [];

  formCreateProducts = this.formBuilder.group({
    name: ['',[Validators.required]],
    price: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    quantity: ['', [Validators.pattern(/^\d+$/)]],
    description: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    store_id: [localStorage.getItem('store_id')],
    image_url: new FormControl<string | Blob>('')
  });

  constructor(
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPostProductsComponent>
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  onChangeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createProduct() {
    if (this.formCreateProducts.valid) {
      const formData = new FormData();

      Object.entries(this.formCreateProducts.controls).forEach(([key, control]) => {
        if (control.value) {
          if (key === 'image_url' && this.selectedFile) {
              formData.append(key, this.selectedFile);
          } 
            formData.append(key, control.value as string);
        }
      });

      this.httpClient
        .post(
          `${environment.host}:${environment.port}/${environment.createProducts}`,
          formData
        )
        .subscribe({
          next: () => {
            this.closeDialog()
          }
        });
    } 
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  getAllCategories() {
    this.httpClient
      .get<ICategoriesResponse[]>(
        `${environment.host}:${environment.port}/${environment.getAllCategoriesByStoreId}/${localStorage.getItem('store_id')}`
      )
      .subscribe({
        next: (response) => {
          this.categories = response;
        }
      });
  }

}