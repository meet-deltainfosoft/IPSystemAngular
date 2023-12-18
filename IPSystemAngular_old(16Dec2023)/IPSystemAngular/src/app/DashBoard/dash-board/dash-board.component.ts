import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class DashBoardComponent implements OnInit {
  formDashBoard: FormGroup;
  dialog_title: string = "DashBoard";
  btnText: string = "Search";
  data: any;
  options: any;

  data1: any;
  options1: any;

  data2: any;
  options2: any;

  //objDashBoard: DashBoard = {};
  dashboardInterval: any;
  totalSociety: number = 0;
  activeSociety: number = 0;
  totalFarmer: number = 10;
  activeFarmer: number = 10;
  totalCenter: number = 0;
  activeCenter: number = 0;
  totalPlant: number = 0;
  activePlant: number = 0;
  chartDatainit: any;
  barChartinit: any;
  revenue = 0;
  IsFiltered : boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private datePipe: DatePipe,) {
    this.formDashBoard = this.fb.group({
      FromDate: [new Date(), Validators.required],
      ToDate: [new Date(), Validators.required]
    })
  }
  ngOnInit() {
    this.horizontalBarChart();
    this.verticalBarChart();
    this.CostSavingTrend();
  }

  async horizontalBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {

      labels: ['Barko', 'Blue', 'Annie', 'Rose', 'Woody', 'Blue', 'Jack', 'Tom', 'Addie', 'Shawn'],

      datasets: [

        {
          label: 'Top 10 HIGHEST POINTS TREND',
          backgroundColor: this.suitableColors,//documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('red'),
          data: [28, 48, 40, 19, 86, 27, 90, 60, 70, 100]
        }
      ]

    };
    const dataPointCount = this.data.labels.length;
    const randomColors = this.generateRandomColors(dataPointCount)
    //this.data.datasets[0].backgroundColor = randomColors;
    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  async verticalBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'Octomber', 'November', 'December'],
      datasets:
        [
          {
            label: 'IPs Points Yearly Trend',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [28, 48, 40, 19, 86, 27, 90, 60, 70, 100, 110, 20]
          }
        ]
    };
    const dataPointCount = this.data.labels.length;
    const randomColors = this.generateRandomColors(dataPointCount)
    this.data1.datasets[0].backgroundColor = this.suitableColors;

    this.options1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
  }

  async CostSavingTrend() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'Octomber', 'November', 'December'],
      datasets:
        [
          {
            label: 'Cost Saving Trend',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [28, 48, 40, 19, 86, 27, 90, 60, 70, 100, 110, 20]
          }
        ]
    };
    const dataPointCount = this.data.labels.length;
    const randomColors = this.generateRandomColors(dataPointCount)
    this.data2.datasets[0].backgroundColor = this.suitableColors;

    this.options2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }
    return colors;
  }


  Search() {
  }

  suitableColors = [
    'rgba(255, 99, 132, 0.7)',   // Red
    'rgba(54, 162, 235, 0.7)',  // Blue
    'rgba(255, 206, 86, 0.7)',  // Yellow
    'rgba(75, 192, 192, 0.7)',  // Green
    'rgba(153, 102, 255, 0.7)', // Purple
    'rgba(255, 159, 64, 0.7)',  // Orange
    'rgba(0, 204, 255, 0.7)',   // Light Blue
    'rgba(255, 0, 255, 0.7)',   // Pink
    'rgba(128, 128, 128, 0.7)', // Gray
    'rgba(0, 128, 0, 0.7)',      // Dark Green
    'rgba(255, 87, 51, 0.7)',   // Coral
    'rgba(0, 204, 153, 0.7)',   // Turquoise
    'rgba(255, 204, 0, 0.7)',   // Gold
    'rgba(102, 204, 255, 0.7)', // Sky Blue
    'rgba(255, 102, 102, 0.7)', // Salmon
    'rgba(153, 204, 0, 0.7)',   // Lime Green
    'rgba(102, 0, 102, 0.7)',   // Deep Purple
    'rgba(51, 204, 51, 0.7)',   // Bright Green
    'rgba(0, 102, 204, 0.7)',   // Royal Blue
    'rgba(204, 102, 255, 0.7)'  // Lavender
  ];
}
