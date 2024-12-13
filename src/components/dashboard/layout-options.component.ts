import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebSocketService } from '../../web/socket.component';

interface IAsideMenu {
  name: string;
  icon: string;
  roles: string[];
  action: () => void;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule],
  providers: [WebSocketService],
  templateUrl: './layout-options.component.html',
  styleUrls: ['./layout-options.component.scss'],
})
export class LayoutDashboardComponent implements OnInit {
  router = inject(Router);

  user = { id: '', image_url: '', name: '', role: '' };
  
  asideMenu: IAsideMenu[] = [
    {
      name: 'Registrar Venda',
      icon: 'add_shopping_cart',
      roles: ['Gerente', 'Vendedor'],
      action: () => this.handleNavigateToCreateSales(),
    },
    {
      name: 'Histórico de Vendas',
      icon: 'history',
      roles: ['Gerente','Vendedor'],
      action: () => this.handleNavigateToHistoryPayments(),
    },
    {
      name: 'Faturamento',
      icon: 'attach_money',
      roles: ['Gerente'],
      action: () => this.handleNavigateToProductBilling(),
    },
    {
      name: 'Funcionários',
      icon: 'people',
      roles: ['Gerente'],
      action: () => this.handleNavigateToEmployees(),
    },
    {
      name: 'Produtos',
      icon: 'widgets',
      roles: ['Gerente', 'Vendedor'],
      action: () => this.handleNavigateToProducts(),
    },
    {
      name: 'Categorias',
      icon: 'category',
      roles: ['Gerente', 'Vendedor'],
      action: () => this.handleNavigateToCategories(),
    },
  ];

  ngOnInit() {
    this.filterMenuByRole();
    this.loadUser();
  }

  constructor(private readonly webSocketService: WebSocketService) {}

  loadUser() {
    this.user.id = localStorage.getItem('user_id') as string;
    this.user.role = localStorage.getItem('role') as string;
    this.user.name = localStorage.getItem('name') as string;
    this.user.image_url = localStorage.getItem('image_url') as string;
  }

  filterMenuByRole() {
    const userRole = localStorage.getItem('role') as string;
    this.asideMenu = this.asideMenu.filter((menu) => menu.roles.includes(userRole));
  }

  handleNavigateToCreateSales() {
    this.router.navigate(['/createsales']);
  }

  handleNavigateToHistoryPayments() {
    this.router.navigate(['/saleshistory']);
  }

  handleNavigateToProductBilling() {
    this.router.navigate(['/productbilling']);
  }

  handleNavigateToEmployees() {
    this.router.navigate(['/employees']);
  }

  handleNavigateToProducts() {
    this.router.navigate(['/products']);
  }

  handleNavigateToCategories() {
    this.router.navigate(['/categories']);
  }

  handleLogout() {
    const storeId = localStorage.getItem('store_id') as string;

    this.webSocketService.leaveRoom(storeId);
    this.webSocketService.disconnect();

    localStorage.clear();
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
