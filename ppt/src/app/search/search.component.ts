import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  addInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastrService: ToastrService,
    private ApiService: MasterService) {

    this.addInfoForm = this.formBuilder.group({
      value: [''],
    })
  }   

  search(){
    if(this.addInfoForm.valid){
      let val = this.addInfoForm.controls['value'].value;
  console.log(val,'search text');
  
      this.ApiService.searchSlides(val).subscribe((data: any) => {
        console.log(data);
        let value = JSON.stringify(data)
        localStorage.setItem('SplitData',value)
        this.router.navigate(['metadata']);
      } )
  
  
      }
  }

}
