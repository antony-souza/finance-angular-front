import { Component, inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface IRecoveryResponse {
  message: string
  recoveryCode: string
}

interface IResponseValidateCode {
  message: string
  recoveryCode: string
}

@Component({
  selector: 'app-revovery',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule, ReactiveFormsModule],
  templateUrl: './revovery.component.html',
  styleUrl: './revovery.component.scss'
})
export class RevoveryComponent {

  formBuilder = inject(FormBuilder);
  isLoading = false;
  isLinear = false;
  router = inject(Router);

  constructor(private readonly httpClient: HttpClient) { }

  firstFormRecoveryEmail = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]]
  });

  twoFormRecoveryCode = this.formBuilder.group({
    recoveryCode: ['',[Validators.required]]
  });

  threeFormRecoveryPassword = this.formBuilder.group({
    recoveryCode: ['',[Validators.required]],
    password: ['',[Validators.required, Validators.minLength(6)]],
  });

  sendEmailForRecovery() {
    this.isLoading = true;
    this.httpClient.post<IRecoveryResponse>(`${environment.apiProd}/${environment.sendCodeRecoveryByEmail}`, this.firstFormRecoveryEmail.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  validateCodeRecovery() {
    this.isLoading = true;
    this.httpClient.post<IResponseValidateCode>(`${environment.apiProd}/${environment.validateCodeRecovery}`, this.twoFormRecoveryCode.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  updatePassword(recoveryCode: string) {
    this.isLoading = true;
    this.threeFormRecoveryPassword.controls.recoveryCode.setValue(recoveryCode);
    this.httpClient.put(`${environment.apiProd}/${environment.updateUserForRecovery}`, this.threeFormRecoveryPassword.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.threeFormRecoveryPassword.reset();
        this.firstFormRecoveryEmail.reset();
        this.twoFormRecoveryCode.reset();
      },
      error: () => {
        this.isLoading = false;
    
      }
    })
  }

  goBackLogin(){
    this.router.navigate(['/']);
  }
}
