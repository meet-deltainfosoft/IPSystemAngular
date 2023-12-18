import { Component, OnInit } from '@angular/core';
import { Leaderboarddetail } from './leaderboarddetail';
import { LeadingComment } from '@angular/compiler';
import { LeaderboardDetailService } from './leaderboard-detail.service';
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
  selector: 'app-leader-board-detail',
  templateUrl: './leader-board-detail.component.html',
  styleUrls: ['./leader-board-detail.component.css']
})


export class LeaderBoardDetailComponent implements OnInit {
  objDashBoard: Leaderboarddetail = {};
  leaders = [
    { EmployeeName: 'IP System ', Score: 100, StarCount: 5, TotalIPs: 1 }
  ];
  dialog_title: string = "Leaderboad Detail";

  constructor(private dashBoard2Service: LeaderboardDetailService,private router: Router) { }

  ngOnInit() {
    this.GetLeaderBoardDetails();
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

  async GetLeaderBoardDetails(){
    this.objDashBoard.FromDate ="2023-01-01";
    this.objDashBoard.ToDate = "2023-12-31";
    this.objDashBoard.PlantId = undefined;
    var response = await this.dashBoard2Service.GetLeaderBoardDetail(this.objDashBoard);
    console.log(response.data);
    this.leaders = response.data.leaderBoardDetails;
    
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

  calculateWidth(score: number): string {
    const maxWidth = 150; // Maximum width in pixels
    const maxWidthScore = 100; // The score at which the width should be at its maximum
  
    // Calculate the width as a percentage of the maximum width
    const widthPercentage = (score / maxWidthScore) * 100;
  
    // Ensure the width doesn't exceed the maximum width
    const finalWidth = Math.min(widthPercentage, 100);
  
    return finalWidth + '%';
  }

  LeaderBoardDetails(){
    this.router.navigate(['/dashBoard']);
  }


}
