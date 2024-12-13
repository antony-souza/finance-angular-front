import { Component } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environment/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpApiComponent } from '../../../utils/http/http.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dialog-post-categories',
  templateUrl: './dialog-post-categories.component.html',
  styleUrls: ['./dialog-post-categories.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS,HttpClientModule],
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
    private readonly httpClient: HttpApiComponent,
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

      Object.entries(this.formCreateCategories.controls).forEach(([key, control]) => {
        if (control.value) {
          if (key === 'image_url' && this.selectedFile) {
              formData.append(key, this.selectedFile);
          } 
            formData.append(key, control.value as string);
        }
      });

      const endpoint = `${environment.createCategories}/${localStorage.getItem('store_id')}`;
      this.httpClient
        .genericHttpRequest<FormData>(endpoint, 'POST', true, formData)
        .subscribe(() => {
          this.isLoading = false;
          this.closeDialog();
    });
    } 
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
