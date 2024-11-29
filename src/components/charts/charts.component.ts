import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WebSocketService } from '../../web/socket.component'; // Seu serviço de WebSocket
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

Chart.register(...registerables);

interface IChartProps {
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit, OnDestroy {
  chartData: IChartProps[] = [];

  constructor(
    private webSocketService: WebSocketService,
    private readonly httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.webSocketService.on('chartData', (data: IChartProps[]) => {
      this.chartData = data; // Recebe os dados do gráfico
      this.createChart();
    });

    this.webSocketService.emit('connectToSocket', { message: 'oi' });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  createChart(): void {
    this.chartData.forEach((data) => {
      new Chart('myChart', {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.data,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Receitas Alcançadas por Estado'
            },
          },
        }
      });
    });
  }
}
