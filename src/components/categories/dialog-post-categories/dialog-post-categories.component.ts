import { Component } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environment/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-post-categories',
  templateUrl: './dialog-post-categories.component.html',
  styleUrls: ['./dialog-post-categories.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
  providers: []
})
export class DialogPostCategoriesComponent {

  private selectedFile: File | null = null;
  isLoading = false;

  formCreateCategories = this.formBuilder.group({
    name: ['',[Validators.required]],
    store_id: [localStorage.getItem('store_id')],
    image_url: new FormControl<string | Blob>('')
  });

  constructor(
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPostCategoriesComponent>
  ) {}

  onChangeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createCategories() {
    if (this.formCreateCategories.valid) {
      this.isLoading = true;
      const formData = new FormData();
      const formValues = this.formCreateCategories.value;

      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          if (key === 'image_url' && this.selectedFile) {
            formData.append(key, this.selectedFile);
          } 
            formData.append(key, value as string);
        }
      });

      this.httpClient.post(`${environment.apiProd}/${environment.createCategories}`, formData)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.closeDialog()
        },
        error: () => {
          this.isLoading = false
        }
      })
    } 
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
