import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../web/socket.component';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
interface IUserProps {
  id: string;
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_COMPONENTS],
  providers: [WebSocketService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  router = inject(Router)

  user: IUserProps
  isMenuOpen = false

  constructor(private readonly webSocketService: WebSocketService) {
    this.user = JSON.parse(localStorage.getItem('user') as string)
  }

  handleLogout() {
    const storeId = localStorage.getItem('store_id') as string;

    this.webSocketService.leaveRoom(storeId);
    this.webSocketService.disconnect();

    localStorage.clear();
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
