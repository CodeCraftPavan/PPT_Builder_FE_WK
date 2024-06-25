import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMergePPT(): void {
    this.router.navigate(['/Merge']);
  }

  onSplitPPT(): void {
    // Add your split PPT logic here
    this.router.navigate(['/splitPPt']);
  }

  onSearch(): void{
    this.router.navigate(['/search']);
  }
}
