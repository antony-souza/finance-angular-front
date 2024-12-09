import { Component } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout-options',
  standalone: true,
  imports: [...MATERIAL_COMPONENTS, CommonModule, HeaderComponent],
  templateUrl: './layout-options.component.html',
  styleUrl: './layout-options.component.scss'
})
export class LayoutOptionsComponent {

}
