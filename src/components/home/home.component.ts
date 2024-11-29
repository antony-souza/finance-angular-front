import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { routes } from '../../app/app.routes';
import { Router } from '@angular/router';
import { ChartsComponent } from "../charts/charts.component";

interface IUsersResponse {
  id: string
  image_url: string
  name: string
  email: string
  password: string
  role: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  constructor(private readonly httpClient: HttpClient) { }

  router = inject(Router)

  users: IUsersResponse[] = []

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.httpClient.get<IUsersResponse[]>(`${environment.host}:${environment.port}/${environment.getAllUsers}`)
        .subscribe({
          next: (response) => {
            this.users = response
            this.users.map((user,) => {
              user.role = user.role === 'ADMIN' ? 'Administrador' : 'Usuário'
            })
          }
        })
    }
  }

  handleLogout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

}