import { Component, inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  router = inject(Router);

  constructor(private readonly httpClient: HttpClient) { }

  recoveryForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]]
  });

  sendEmailForRecovery() {
    this.isLoading = true;
    this.httpClient.post(`${environment.apiProd}/${environment.sendCodeRecoveryByEmail}`, this.recoveryForm.value)
    .subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
      },
      error: (erro) => {
        this.isLoading = false;
        console.log(erro)
      }
    })
  }

  goBackLogin(){
    this.router.navigate(['/']);
  }
}
