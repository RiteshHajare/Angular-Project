import { Component,NgZone,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  bookForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudApi:CrudService){
      this.bookForm = this.formBuilder.group({
        name:[''],
        price:[''],
        Description:['']
      })
     }

     ngOnInit(): void{

     }

     onSubmit():any{
      this.crudApi.AddBook(this.bookForm.value).subscribe((res:any)=>{
        console.log("added successfully");
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/books-list')
        },(err:any)=>{
             console.log(err);
             
        })
        
      })
     }
}
