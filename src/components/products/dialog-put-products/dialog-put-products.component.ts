import { Component, Inject, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

interface ICategoriesResponse {
  id: string;
  name: string;
}

@Component({
  selector: 'app-dialog-put-products',
  templateUrl: './dialog-put-products.component.html',
  styleUrls: ['./dialog-put-products.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
})
export class DialogPutProductsComponent implements OnInit {

  private selectedFile: File | null = null;
  categories: ICategoriesResponse[] = [];
  isLoading = false;

  formUpdateProducts = this.formBuilder.group({
    name: [''],
    price: [''],
    description: [''],
    category_id: [''],
    quantity: ['', [Validators.pattern(/^\d+$/)]],
    image_url: new FormControl<string | Blob>(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPutProductsComponent>
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

  saveChanges() {
    if (this.formUpdateProducts.valid) {
      this.isLoading = true;
      const formData = new FormData();
      const formValues = this.formUpdateProducts.value;

      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          if (key === 'image_url' && this.selectedFile) {
            formData.append(key, this.selectedFile);
          } 
            formData.append(key, value as string);
        }
      });

      this.httpClient
        .put(
          `${environment.apiProd}/${environment.updateProduct}/${this.data.id}`,
          formData
        )
        .subscribe({
          next: () => {
            this.closeDialog()
            this.isLoading = false;
          }
        });
    } 
  }

  getAllCategories() {
      this.httpClient
        .get<ICategoriesResponse[]>(
          `${environment.apiProd}/${environment.getAllCategoriesByStoreId}/${localStorage.getItem('store_id')}`
        )
        .subscribe({
          next: (response) => {
            this.categories = response;
          }
        });
    }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
