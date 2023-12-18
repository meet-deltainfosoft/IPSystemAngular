import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { DashBoard2Service } from './dash-board2.service';
import { DashBoard } from '../dash-board';
import { NavbarComponent } from 'src/app/_Layout/navbar/navbar.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as jspdf from 'jspdf';
import { ViewChild } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LeaderBoardDetailComponent } from '../leader-board-detail/leader-board-detail.component';
import { Router } from '@angular/router';



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
  selector: 'app-dash-board2',
  templateUrl: './dash-board2.component.html',
  styleUrls: ['./dash-board2.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class DashBoard2Component implements OnInit {
  @ViewChild('contentToCapture', { static: false }) contentToCapture: ElementRef | undefined;

  leaders = [
    { EmployeeName: 'IP System ', Score: 100, StarCount: 5, TotalIPs: 1 }
  ];
  formDashBoard: FormGroup;
  dialog_title: string = "Dashboard";
  btnText: string = "Search";
  data: any;
  options: any;
  Chart: any;
  data1: any;
  options1: any;

  data2: any;
  options2: any;


  data3: any;
  options3: any;
  donutChart: any;

  data4: any;
  options4: any;
  dashboardInterval: any;
  chartDatainit: any;
  barChartinit: any;
  revenue = 0;
  IsFiltered: boolean = false;
  objDashBoard: DashBoard = {};
  PlantListFilter: any[] = [];
  PlantList: any[] = [];
  HighestPointsYear: string = "";
  TotalValidatedSavings: string = "";
  HighestValidatedIPs: string = "";
  PendingIps: string = "";
  IpKwCount: string = "";
  TotalIPs: string = "";

  radarChartData: any;
  radarchartOptions: any;
  pdfUrl: string = "";
  CurrentDateTime : string = "";

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private datePipe: DatePipe,
    private el: ElementRef, private dashBoard2Service: DashBoard2Service, 
    private navabarComponent: NavbarComponent,private dialog: MatDialog,private router: Router) {
    this.formDashBoard = this.fb.group({
      FromDate: [new Date(new Date().getFullYear(), 0, 1), Validators.required],
      ToDate: [new Date(), Validators.required],
      PlantId: ['0', Validators.required]
    })
    this.navabarComponent.sidenev?.close();
  }
  ngOnInit() {
    this.GetDashBoardDropdDown();
    this.GetDashBoardData();
    this.navabarComponent.sidenev?.close();
    this.CurrentDateTime = this.Dateformat1(new Date());
  }

  async horizontalBarChart(labels: any, data: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: labels,//['Barko', 'Blue', 'Annie', 'Rose', 'Woody', 'Blue', 'Jack', 'Tom', 'Addie', 'Shawn'],
      datasets: [
        {
          label: 'Top 10 HIGHEST POINTS TREND',
          backgroundColor: this.suitableColors,//documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('red'),
          data: data
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

  async verticalBarChart(label: any, Data: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data1 = {
      labels: label,
      datasets:
        [
          {
            label: 'IPs Points Yearly Trend',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: Data
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

  async CostSavingTrend(label: any, Data: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data2 = {
      labels: label,
      datasets:
        [
          {
            label: 'Hard Saving Trend',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: Data
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

  suitableColors1 = [
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


  suitableColors = [
    'rgb(11, 62, 97)'
  ];

  CreateDonultChart(label: any, data: any) {
    this.data3 = {
      labels: label,
      datasets: [
        {
          data: data,//[30, 40, 25, 45, 55, 35],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ]
        }
      ]
    };
    this.options3 = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Top Performer Employee',
        fontSize: 16
      },
    };
  }
  DownloadGiftPDF() {
    this.dashBoard2Service.DownloadGiftPDF().subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'gift.pdf';
        link.click();
      },
      (error) => {
        console.error('An error occurred:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }





  async GetDashBoardDropdDown() {
    var response = await this.dashBoard2Service.GetDashBoardDropdDown();
    this.PlantList = response.data;
    this.PlantListFilter = this.PlantList;
  }

  async GetDashBoardData() {
    this.objDashBoard.FromDate = this.Dateformat(this.formDashBoard.controls["FromDate"].value);
    this.objDashBoard.ToDate = this.Dateformat(this.formDashBoard.controls["ToDate"].value);
    this.objDashBoard.PlantId = this.formDashBoard.controls["PlantId"].value;
    this.objDashBoard.PlantId = this.formDashBoard.controls["PlantId"].value === "0" ? null : this.formDashBoard.controls["PlantId"].value;
    var response = await this.dashBoard2Service.GetDashBoardData(this.objDashBoard);
    console.log(response.data);
    //Widget Part Start From Here
    this.leaders = response.data.highestPoints;
    this.HighestPointsYear = response.data.ipSummary[0].HighestPointsYear;
    this.TotalValidatedSavings = response.data.ipSummary[0].TotalValidatedSavings;
    this.HighestValidatedIPs = response.data.ipSummary[0].HighestValidatedIPs;
    this.PendingIps = response.data.ipSummary[0].PendingIps;
    this.IpKwCount = response.data.ipSummary[0].IpKwCount;
    this.TotalIPs = response.data.ipSummary[0].TotalIPs;
    const labels = response.data.highestPoints.map((item: { Employee: any; }) => item.Employee);
    const data = response.data.highestPoints.map((item: { Points: any; }) => item.Points);

    const donutChartlabels = response.data.performer.map((item: { Employee: any; }) => item.Employee);;
    const donutChartdata = response.data.performer.map((item: { CostSaving: any; }) => item.CostSaving);

    const verticalChartlabels = response.data.iPsPointsYearlyTrend.map((item: { monthName: any; }) => item.monthName);;
    const verticalChartdata = response.data.iPsPointsYearlyTrend.map((item: { points: any; }) => item.points)

    const CostSavingTrendChartlabels = response.data.costSavingTrend.map((item: { MonthName: any; }) => item.MonthName);;
    const CostSavingTrendChartdata = response.data.costSavingTrend.map((item: { Qty: any; }) => item.Qty)

    this.horizontalBarChart(labels, data);
    this.CreateDonultChart(donutChartlabels, donutChartdata);
    this.verticalBarChart(verticalChartlabels, verticalChartdata);
    this.CostSavingTrend(CostSavingTrendChartlabels, CostSavingTrendChartdata);
  }
  filterClick() {
    this.IsFiltered = this.IsFiltered === true ? false : true;
  }

  getStars(starCount: number): number[] {
    return new Array(starCount);
  }

  getMedalImage(index: number): string {
    if (index === 0) {
      return 'assets/gold.png'; // Replace with the actual path to the gold medal image
    } else if (index === 1) {
      return 'assets/silver.png'; // Replace with the actual path to the silver medal image
    } else if (index === 2) {
      return 'assets/bronza.png'; // Replace with the actual path to the bronze medal image
    } else {
      return 'assets/bronza.png'; // Return an empty string or a placeholder image path for the rest
    }
  }
  exportHtmlToImage() {

  }

  getPointColor(score: number): string {
    // Define your logic to set the color based on the score
    // For example, you can use a gradient or a predefined color scale
    // Here's a simple example:
    if (score >= 90) {
      return 'green';
    } else if (score >= 70) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  calculateWidth(score: number): string {
    const maxWidth = 150; // Maximum width in pixels
    const maxWidthScore = 100; // The score at which the width should be at its maximum
  
    // Calculate the width as a percentage of the maximum width
    const widthPercentage = (score / maxWidthScore) * 100;
  
    // Ensure the width doesn't exceed the maximum width
    const finalWidth = Math.min(widthPercentage, 100);
  
    return finalWidth + '%';
  }

  calculateWidthBasedOnPoints(score: number): number {
    console.log(score);
    
    const modifiedScore = score + 30; // Add 30 to the score
    const maxWidth = 150; // Set the maximum width you want when the highest score is reached
    const scaleFactor = modifiedScore > 0 ? maxWidth / modifiedScore : 1;

    console.log('modifiedScore:', modifiedScore);
    console.log('maxWidth:', maxWidth);
    console.log('scaleFactor:', scaleFactor);

    return modifiedScore > 0 ? maxWidth : 0;
  }

  
  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

  Dateformat1(date: Date | null): string {
    return this.datePipe.transform(date, 'dd-MMM-yyyy') ?? '';
  }

  LeaderBoardDetails(){
    this.router.navigate(['/leaderBoardDetail']);
  // const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.closeOnNavigation = true;
  //   dialogConfig.maxHeight = "100%";
  //   dialogConfig.maxWidth = "100%";
  //   dialogConfig.width = "1000px";
  //   dialogConfig.height = "fit-content";
  //   const dialogRef = this.dialog.open(LeaderBoardDetailComponent, dialogConfig);
  }


}

