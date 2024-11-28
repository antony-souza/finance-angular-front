import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environment/environment';

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

export class HomeComponent {
  constructor(private readonly httpClient: HttpClient) { }

  users: IUsersResponse[] = []

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.httpClient.get<IUsersResponse[]>(`${environment.host}:${environment.port}/${environment.getAllUsers}`)
        .subscribe({
          next: (response) => {
            this.users = response
          }
        })
    }
  }
}