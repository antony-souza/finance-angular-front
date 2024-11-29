import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['Bahia', 'São Paulo', 'Rio Grande do Sul', 'Ceará', 'Pernambuco', 'Paraná'],
        datasets: [{
          data: [12, 20, 3, 22, 2, 3],
          borderWidth: 1
        }]
      }
      , options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Receitas Alcançadas por Estado'
          },
          legend: {
            display: true,
            position: 'top'
          },
        }
      }
    });
  }
}
