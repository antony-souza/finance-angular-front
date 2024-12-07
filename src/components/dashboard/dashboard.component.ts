import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { RouterModule } from '@angular/router';

interface IMenuItem {
  name: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_COMPONENTS, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  menuItems: IMenuItem[] = [
    { name: 'Histórico de Vendas', icon: 'attach_money', path: '/settings' },
    { name: 'Faturamento dos Produtos', icon: 'business', path: '/profile' },
    {name: 'Funcionáros', icon: 'people', path: '/employees'},
  ];
}
