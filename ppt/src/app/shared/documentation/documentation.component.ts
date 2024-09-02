import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent {
  constructor(
    private router: Router
  ){

  }
  onClick(){
    this.router.navigate(['/dashboard/mergeppt']);
  }

}
