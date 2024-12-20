import { Component } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-post-employees',
  templateUrl: './dialog-post-employees.component.html',
  styleUrls: ['./dialog-post-employees.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
})
export class DialogPostEmployeesComponent {

  private selectedFile: File | null = null;
  isLoading = false;

  formCreateEmployees = this.formBuilder.group({
    name: ['',[Validators.required]],
    role: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    store_id: [localStorage.getItem('store_id')],
    image_url: new FormControl<string | Blob>('')
  });

  constructor(
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPostEmployeesComponent>
  ) {}

  onChangeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createEmployees() {
    if (this.formCreateEmployees.valid) {
      this.isLoading = true;
      const formData = new FormData();
      const formValues = this.formCreateEmployees.value;
      
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          if (key === 'image_url' && this.selectedFile) {
            formData.append(key, this.selectedFile);
          } 
            formData.append(key, value as string);
        }
      });

      this.httpClient
        .post(
          `${environment.apiProd}/${environment.createUser}`,
          formData
        )
        .subscribe({
          next: () => {
            this.closeDialog()
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false
          }
        });
    } 
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
