import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WebSocketService } from '../../web/socket.component'; // Seu serviço de WebSocket
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

Chart.register(...registerables)

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {

  chart: any = []

  constructor(
    private readonly webSocketService: WebSocketService,
    private readonly httpClient: HttpClient) {
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: true,
        responsive: true,
      },
    });
  }
}