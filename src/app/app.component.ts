import { AfterViewInit, Component, OnInit, ViewEncapsulation,enableProdMode } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit, AfterViewInit{
  currentUrl: string ="";
  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.currentUrl = event.url;
        })
      }
    });
  }
  ngOnInit() {
    this.updateCurrentUrl();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.updateCurrentUrl();
        }, 100);
      }
    });
  }

  private updateCurrentUrl(): void {
    this.currentUrl = this.router.url;
  }

  constructor(private router: Router) {
  }

  
  static readonly encapsulation: ViewEncapsulation = ViewEncapsulation.None;
  title = 'kaizenAngular';
}
