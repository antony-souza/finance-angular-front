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
  
  asideMenu: IAsideMenu[] = [
    {
      name: 'Registrar Venda',
      icon: 'add_shopping_cart',
      roles: ['ADMIN', 'USER'],
      action: () => this.handleNavigateToCreateSales(),
    },
    {
      name: 'Histórico de Vendas',
      icon: 'history',
      roles: ['ADMIN'],
      action: () => this.handleNavigateToHistoryPayments(),
    },
    {
      name: 'Faturamento',
      icon: 'attach_money',
      roles: ['ADMIN', 'USER'],
      action: () => this.handleNavigateToProductBilling(),
    },
    {
      name: 'Funcionários',
      icon: 'people',
      roles: ['ADMIN'],
      action: () => this.handleNavigateToEmployees(),
    },
    {
      name: 'Produtos',
      icon: 'widgets',
      roles: ['ADMIN', 'USER'],
      action: () => this.handleNavigateToProducts(),
    },
    {
      name: 'Categorias',
      icon: 'category',
      roles: ['ADMIN', 'USER'],
      action: () => this.handleNavigateToCategories(),
    },
  ];

  ngOnInit() {
    this.filterMenuByRole();
  }

  constructor(private readonly webSocketService: WebSocketService) {}

  filterMenuByRole(): void {
    const role = (localStorage.getItem('role') as string).toUpperCase();
    this.asideMenu = this.asideMenu.filter(menu =>
      menu.roles.map((role) => role.toUpperCase()).includes(role)
    );
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
