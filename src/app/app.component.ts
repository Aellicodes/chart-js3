import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private sub: Subscription;

  public chartData: ChartDataset[] = [
    {data: [], label: 'Data', backgroundColor: '#82c4c3', borderRadius: 20},
    {data: [], label: 'Data', backgroundColor: '#f9d89c', borderRadius: 20}
  ];
  public labels: string[] = ['January', 'February', 'March', 'April'];
  color = '#f5a7a7';
  scaleOptions = {
        grid: {
          color: this.color
        },
        ticks: {
          color: this.color
        }
      };

  public options: ChartOptions = {
    scales: {
      x: this.scaleOptions,
      y: this.scaleOptions
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          color: this.color
        }
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sub = this.http.get('https://api.coingecko.com/api/v3/exchange_rates')
    .subscribe((data: any) => {
      this.chartData[0].data = [data.rates.aed.value, data.rates.brl.value, data.rates.cny.value, data.rates.dkk.value];
      this.chartData[1].data = [data.rates.hkd.value, data.rates.ils.value, data.rates.myr.value, data.rates.nok.value];
      this.chart.update();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
