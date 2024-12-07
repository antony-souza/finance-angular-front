import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-layout-dash-header',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent],
  templateUrl: './layout-dash-header.component.html',
  styleUrls: ['./layout-dash-header.component.scss']
})
export class LayoutDashHeaderComponent { 


}
