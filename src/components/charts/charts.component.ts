import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WebSocketService } from '../../web/socket.component'; // Seu serviço de WebSocket
import { ChartService } from './services/chart.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

type chartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./charts.component.scss'],
})
export class ChartBaseComponent implements OnInit {

  @Input() chartReference: string = '';
  @Input() chartType: chartType = 'pie';
  @Input() chartTitle: string = '';
  @Input()

  public chart: any;
  public chartInfo: any
  private label: string[] = [];
  private data: number[] = [];

  constructor(
    public readonly chartService: ChartService,
    public readonly webSocketService: WebSocketService
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

        if (this.chartReference) {
          this.renderChart(this.chartReference, this.chartType, this.label, this.data);
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

      if (this.chartReference) {
        this.renderChart(this.chartReference, this.chartType, this.label, this.data);
      }
    });
  }

  renderChart(idReference: string, chartType: chartType, label: string[], data: number[]) {
    const ctx = idReference

    if (this.chart) {
      this.chart.destroy();
    }

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: label,
          datasets: [
            {
              label: 'Vendas',
              data: data,
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
