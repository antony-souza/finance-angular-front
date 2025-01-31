/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WebSocketService } from '../../web/socket.component';
import { ChartService, IChartInfo } from './services/chart.service';
import { CommonModule } from '@angular/common';
import { formatPrice } from '../../utils/formatMoney/format-price.service';

Chart.register(...registerables);

type chartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./charts.component.scss'],
})
export class ChartBaseComponent implements OnInit, OnDestroy {

  @Input() chartReference = '';
  @Input() chartType: chartType = 'pie';
  @Input() chartTitle = '';
  @Input() messageSockets = '';

  public chart: any;
  public chartInfo: IChartInfo[] = [];
  private label: string[] = [];
  private data: number[] = [];

  constructor(
    public readonly chartService: ChartService,
    public readonly webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    
    this.chartReference = this.generateRandomId();

    this.chartService.getChartInfo().subscribe((data) => {
      this.chartInfo = data;

      this.processChartData();
      if (this.chartReference) {
        this.renderChart(this.chartReference, this.chartType, this.label, this.data);
      }
    });

    this.webSocketService.connect();
    this.webSocketService.joinRoom(localStorage.getItem('store_id') as string);
    this.webSocketService.on(this.messageSockets, (data) => {
      this.chartInfo = data;

      this.processChartData();
      if (this.chartReference) {
        this.renderChart(this.chartReference, this.chartType, this.label, this.data);
      }
    });
  }

  processChartData(): void {
    if (this.chartInfo) {

      this.label = [];
      this.data = [];

      for (const item of this.chartInfo) {
        this.label.push(item.productName);
        this.data.push(item.totalBilled);
      }
    }
  }

  renderChart(idReference: string, chartType: chartType, label: string[], data: number[]) {
    const ctx = document.getElementById(idReference) as HTMLCanvasElement;

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
              label: 'Total Faturado',
              data: data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: 2,
          normalized: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                color: 'black',
              }
            },
            /* title: {
              display: true,
              text: this.chartTitle,
              font: {
                size: 20,
                style: 'italic',
              },
              color: 'black',
            }, */
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const formatedPrice = formatPrice(tooltipItem.raw);
                  return formatedPrice || 'R$ 0,00';
                }
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback(tickValue, index, ticks) {
                  return formatPrice(ticks[index].value);
                },
              }
            }
          }
        },
      });
    }
  }
  ngOnDestroy(): void {
    this.webSocketService.leaveRoom(localStorage.getItem('store_id') as string);
    this.webSocketService.disconnect();
  }

  generateRandomId(length = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
