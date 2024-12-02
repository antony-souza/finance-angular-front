import { Component } from '@angular/core';
import { ChartBaseComponent } from '../charts/charts.component';
import { ChartService } from '../charts/services/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent extends ChartBaseComponent {

  public constructor(public service: ChartService) {
    super(service);
  }

  override createChart(labeldata: any[], realdata: any[]): void {
    this.chart = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'No of sales',
            data: realdata,
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }
}

