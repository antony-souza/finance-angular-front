import { Component, Inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-dialog-put-products',
  templateUrl: './dialog-put-products.component.html',
  styleUrls: ['./dialog-put-products.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
})
export class DialogPutProductsComponent  {

  private selectedFile: File | null = null;

  formUpdateProducts = this.formBuilder.group({
    name: [''],
    price: [''],
    description: [''],
    quantity: ['', [Validators.pattern(/^\d+$/)]],
    image_url: new FormControl<string | Blob>(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPutProductsComponent>
  ) {}

  onChangeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveChanges() {
    if (this.formUpdateProducts.valid) {
      const formData = new FormData();

      Object.entries(this.formUpdateProducts.controls).forEach(([key, control]) => {
        if (control.value) {
          if (key === 'image_url' && this.selectedFile) {
              formData.append(key, this.selectedFile);
          } 
            formData.append(key, control.value as string);
        }
      });

      this.httpClient
        .put(
          `${environment.host}:${environment.port}/${environment.updateProduct}/${this.data.id}`,
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
}
