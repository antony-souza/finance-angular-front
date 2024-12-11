import { Component, Inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface IEmployeeUpdate {
  name?: string;
  email?: string;
  image_url?: string;
}

@Component({
  selector: 'app-dialog-put-employees',
  templateUrl: './dialog-put-employees.component.html',
  styleUrls: ['./dialog-put-employees.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS]
})
export class DialogPutEmployeesComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user_id: string },
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPutEmployeesComponent> 
  ) { }

  formUpdateEmployee = this.formBuilder.group({
    name: '',
    email: ['', [Validators.email]],
    image_url: new FormControl<string | Blob>(''),
  });

  saveChanges() {
    if (this.formUpdateEmployee.valid) {
      this.httpClient
        .put<IEmployeeUpdate>(`${environment.host}:${environment.port}/${environment.updateUser}/${this.data.user_id}`, this.formUpdateEmployee.value)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
