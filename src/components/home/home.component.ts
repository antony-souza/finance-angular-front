import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { ChartBaseComponent } from '../charts/charts.component';
import { LayoutDashHeaderComponent } from '../layout-dash-header/layout-dash-header.component';

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
  imports: [CommonModule, HttpClientModule, ChartBaseComponent, LayoutDashHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  users: IUsersResponse[] = []

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  router = inject(Router)

  ngOnInit() {
    this.httpClient.get<IUsersResponse[]>(`${environment.host}:${environment.port}/${environment.getAllUsers}`)
      .subscribe({
        next: (response) => {
          this.users = response
        }
      })
  }
}