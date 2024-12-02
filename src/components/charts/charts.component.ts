import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WebSocketService } from '../../web/socket.component'; // Seu serviço de WebSocket
import { environment } from '../../environment/environment';
import { ChartService } from './services/chart.service';
import { PieChartComponent } from "../pie-chart/pie-chart.component";

Chart.register(...registerables)

interface IChartInfo {
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  standalone: true,
  styleUrl: './charts.component.scss',
  imports: [PieChartComponent],
})
export class ChartBaseComponent implements OnInit {

  public chart: any;
  private chartInfo: any;
  private label: string[] = [];
  private data: number[] = [];

  constructor(
    private readonly chartService: ChartService) {
  }

  ngOnInit(): void {
    this.chartService.getChartInfo().subscribe((response) => {
      this.chartInfo = response;
      console.log(response)
      if (this.chartInfo != null) {
        for (let i = 0; i < this.chartInfo.length; i++) {
          this.label.push(this.chartInfo[i].label);
          this.data.push(this.chartInfo[i].data);
        }
        this.createChart(this.label, this.data);
      }
    });
  }

  createChart(labeldata: string[], realdata: any[]) {
   /*  this.chart = new Chart('canvas', {
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
    }) */
  }
}