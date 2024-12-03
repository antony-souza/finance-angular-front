import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WebSocketService } from '../../web/socket.component'; // Seu serviço de WebSocket
import { ChartService } from './services/chart.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

interface IChartInfo {
  labels: string[];
  data: number[];
  type?: chartType;
}

type chartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./charts.component.scss'],
})
export class ChartBaseComponent implements OnInit {

  @ViewChild('barChart') barChartRef: ElementRef | undefined;

  public chart: any;
  public chartInfo: any;
  private label: string[] = [];
  private data: number[] = [];

  constructor(
    private readonly chartService: ChartService,
    private readonly webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.chartService.getChartInfo().subscribe((response) => {
      this.chartInfo = response;
      console.log(response);
      if (this.chartInfo != null) {
        for (let i = 0; i < this.chartInfo.length; i++) {
          this.label.push(this.chartInfo[i].label);
          this.data.push(this.chartInfo[i].data);
        }

        if (this.barChartRef && this.barChartRef.nativeElement) {
          this.renderChart(this.barChartRef.nativeElement, 'bar');
        }
      }
    });

    this.webSocketService.on('update', data => {
      console.log('Dados atualizados do WebSocket:', data);
      this.chartInfo = data;
      this.label = [];
      this.data = [];

      for (let i = 0; i < this.chartInfo.length; i++) {
        this.label.push(this.chartInfo[i].label);
        this.data.push(this.chartInfo[i].data);
      }

      if (this.barChartRef && this.barChartRef.nativeElement) {
        this.renderChart(this.barChartRef.nativeElement, 'bar');
      }
    });
  }

  private renderChart(canvasElement: HTMLCanvasElement, chartType: chartType) {
    const ctx = canvasElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: this.label,
          datasets: [
            {
              label: 'Vendas',
              data: this.data,
            },
          ],
        },
        options: {
          responsive: true
        }
      });
    }
  }
}
