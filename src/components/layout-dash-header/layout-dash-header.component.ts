import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout-dash-header',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './layout-dash-header.component.html',
  styleUrl: './layout-dash-header.component.scss'
})
export class LayoutDashHeaderComponent {

}
