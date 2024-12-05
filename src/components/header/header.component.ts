import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface IUserProps {
  id: string
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  router = inject(Router)

  user: IUserProps

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') as string)
  }

  handleLogout() {
    localStorage.clear()

    this.router.navigate(['/'])
  }
}
