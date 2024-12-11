import { Component, Inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-put-employees',
  templateUrl: './dialog-put-employees.component.html',
  styleUrls: ['./dialog-put-employees.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
})
export class DialogPutEmployeesComponent {

  private selectedFile: File | null = null;

  formUpdateEmployee = this.formBuilder.group({
    name: [''],
    email: ['', [Validators.email]],
    image_url: new FormControl<string | Blob>(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user_id: string },
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPutEmployeesComponent>
  ) {}

  onChangeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveChanges() {
    if (this.formUpdateEmployee.valid) {
      const formData = new FormData();

      Object.entries(this.formUpdateEmployee.controls).forEach(([key, control]) => {
        if (control.value) {
          if (key === 'image_url' && this.selectedFile) {
              formData.append(key, this.selectedFile);
          } 
            formData.append(key, control.value as string);
        }
      });

      this.httpClient
        .put(
          `${environment.host}:${environment.port}/${environment.updateUser}/${this.data.user_id}`,
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
