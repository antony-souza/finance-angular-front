import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

interface IAuth {
  email: string;
  password: string;
  token: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent {

  private form = inject(FormBuilder)
  private validadtors = Validators

  constructor(private readonly httpClient: HttpClient) { }

  protected formAuth = this.form.group({
    email: ['', [this.validadtors.required, this.validadtors.email]],
    password: ['', [this.validadtors.required, this.validadtors.minLength(6)]]
  })

  onSubmitAuth() {
    if (this.formAuth.valid) {
      this.httpClient
        .post<IAuth>(`${environment.host}:${environment.port}/${environment.routerAuth}`, this.formAuth.value)
        .subscribe({
          next: (response) => {
            console.log(response)
            localStorage.setItem('token', response.token)
          }
        })
    }
  }
}
