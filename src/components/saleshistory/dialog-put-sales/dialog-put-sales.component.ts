import { Component, Inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../../utils/angular-material/angular-material';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';


@Component({
  selector: 'app-dialog-put-sales',
  templateUrl: './dialog-put-sales.component.html',
  styleUrls: ['./dialog-put-sales.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_COMPONENTS],
})
export class DialogPutSalesComponent  {

  isLoading = false;

  formUpdateSales = this.formBuilder.group({
    quantitySold: ['', [Validators.required]],
    
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private readonly httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPutSalesComponent>
  ) {}

  saveChanges() {
    if (this.formUpdateSales.valid) {
      this.isLoading = true;
      const formData = new FormData()
      const formValues = this.formUpdateSales.value;

      Object.entries(formValues).forEach(([key, value]) => {
        if(value) {
          formData.append(key, value);
        }
      })
        
      this.httpClient
        .put(
          `${environment.apiProd}/${environment.salesUpdate}/${this.data.id}`,
          formValues
        )
        .subscribe({
          next: () => {
            this.closeDialog()
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
    } 
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
