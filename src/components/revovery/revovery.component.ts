import { Component, inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface IRecoveryResponse {
  message: string
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
  recoveryResponse = '';
  isLinear = false;
  router = inject(Router);

  constructor(private readonly httpClient: HttpClient) { }

  firstFormRecoveryEmail = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]]
  });

  twoFormRecoveryCode = this.formBuilder.group({
    code: ['',[Validators.required]]
  });

  threeFormRecoveryPassword = this.formBuilder.group({
    password: ['',[Validators.required, Validators.minLength(6)]],
  });

  sendEmailForRecovery() {
    this.isLoading = true;
    this.httpClient.post<IRecoveryResponse>(`${environment.apiProd}/${environment.sendCodeRecoveryByEmail}`, this.firstFormRecoveryEmail.value)
    .subscribe({
      next: (response) => {
        this.isLoading = false;
        this.recoveryResponse = response.message;
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
