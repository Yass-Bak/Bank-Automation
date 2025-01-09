import { Component, OnInit, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from 'src/app/services/client.service';
import { CompteService } from 'src/app/services/compte.service';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';

export interface TrafficDistributionChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-traffic-distribution',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './traffic-distribution.component.html',
})
export class AppTrafficDistributionComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public trafficdistributionChart!: Partial<TrafficDistributionChart> | any;
  public clientCount: number = 0;
  public compteCount: number = 0;
  constructor(
    private clientService: ClientService,
    private compteService: CompteService
  ) {
    this.trafficdistributionChart = {
      series: [5368, 3500, 4106],
      labels: ['Direct Traffic', 'Referral Traffic', 'Organic Traffic'],
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 160,
      },
      colors: ['#e7ecf0', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                offsetY: 5,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };
  }

  ngOnInit(): void {
    this.loadClientCount();
    this.loadCompteCount();
  }

  private loadClientCount(): void {
    this.clientService.getClientCount().subscribe({
      next: (count) => {
        this.clientCount = count;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nombre de clients', err);
      },
    });
  }

  private loadCompteCount(): void {
    this.compteService.getCompteCount().subscribe({
      next: (count) => {
        console.log('Nombre de comptes:', count);
        this.compteCount = count;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nombre de comptes', err);
      },
    });
  }
}
