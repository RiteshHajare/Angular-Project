import { Component, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  getId:any;
  updateForm!:any;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,
    private crudApi:CrudService){
      console.log(this.getId = this.activatedRoute.snapshot);
      
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.crudApi.getBook(this.getId).subscribe(res=>{
        this.updateForm.setValue({
          name:res['name'],
          price:res['price'],
          Description:res['Description']
        })
      });
      this.updateForm = this.formBuilder.group({
          name:[''],
          price:[''],
          Description:['']
      })  
    }  

    onUpdate(){
      this.crudApi.updateBook(this.getId,this.updateForm.value).subscribe(res=>{
        console.log("data updated successfully");
        this.ngZone.run(()=>{this.router.navigateByUrl('/books-list')})
        
      },(err)=>{
        console.log(err);
        
      })
    }
}
