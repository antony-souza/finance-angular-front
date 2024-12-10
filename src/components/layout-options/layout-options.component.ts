import { Component, inject } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebSocketService } from '../../web/socket.component';

interface IAsideMenu {
  name: string;
  icon: string;
  action: () => void; // Atualizado para uma função anônima
}

@Component({
  selector: 'app-layout-options',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule],
  providers: [WebSocketService],
  templateUrl: './layout-options.component.html',
  styleUrls: ['./layout-options.component.scss'],
})
export class LayoutOptionsComponent {
  router = inject(Router);

  asideMenu: IAsideMenu[] = [
    {
      name: 'Registrar Venda',
      icon: 'add_shopping_cart',
      action: () => this.handleNavigateToCreateSales(), // Corrigido
    },
    {
      name: 'Histórico de Vendas',
      icon: 'history',
      action: () => this.handleNavigateToHistoryPayments(),
    },
    {
      name: 'Faturamento',
      icon: 'attach_money',
      action: () => this.handleNavigateToProductBilling(),
    },
  ];

  constructor(private readonly webSocketService: WebSocketService) {}

  handleNavigateToCreateSales() {
    this.router.navigate(['/createsales']);
  }

  handleNavigateToHistoryPayments() {
    this.router.navigate(['/saleshistory']);
  }

  handleNavigateToProductBilling() {
    this.router.navigate(['/productbilling']);
  }

  handleLogout() {
    const storeId = localStorage.getItem('store_id') as string;

    this.webSocketService.leaveRoom(storeId);
    this.webSocketService.disconnect();

    localStorage.clear();
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
