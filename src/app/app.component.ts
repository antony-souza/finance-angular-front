import {HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ChartService } from '../components/charts/services/chart.service';
import { GenerateXlsxService } from '../utils/generateXlsx/generate-xlsx.service';
import { GenericSearchService } from '../utils/genericSearch/generic-search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, RouterModule],
  providers: [ChartService, GenerateXlsxService, GenericSearchService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
