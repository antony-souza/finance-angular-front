import { Component, Inject, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface IRolesResponse {
  id: string;
  name: string;
  permissionsName: string[];
}

@Component({
  selector: 'app-dialog-put-employees',
  templateUrl: './dialog-put-employees.component.html',
  styleUrls: ['./dialog-put-employees.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
})
export class DialogPutEmployeesComponent implements OnInit {

  private selectedFile: File | null = null;
  isLoading = false;

  roles: IRolesResponse[] = [];

  formUpdateEmployee = this.formBuilder.group({
    name: [''],
    role: [''],
    email: ['', [Validators.email]],
    image_url: new FormControl<string | Blob>(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user_id: string },
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPutEmployeesComponent>
  ) { }

  ngOnInit(): void {
    this.getRoles()
  }

  onChangeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveChanges() {
    if (this.formUpdateEmployee.valid) {
      this.isLoading = true;
      const formData = new FormData();
      const formValues = this.formUpdateEmployee.value;

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
          `${environment.apiProd}/${environment.updateUser}/${this.data.user_id}`,
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

  getRoles(){
    this.httpClient.get<IRolesResponse[]>(`${environment.apiProd}/${environment.getAllRoles}`).subscribe({
      next: (response) => {
        this.roles = response
      }
    })
  }
}
