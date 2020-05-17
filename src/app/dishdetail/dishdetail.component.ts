import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import{Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { of, from } from 'rxjs';
import{delay, switchMap} from 'rxjs/operators';
import{Comment} from  '../shared/comment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})

export class DishdetailComponent implements OnInit {
  
  dish : Dish;
  dishIds: string[];
  prev: string;
  next: string;
  @ViewChild('cform') commentFormDirective;
  commentForm:FormGroup;
  comment:Comment;
  formErrors={
    'author': '',
    'çomment':''
  };
  validationMessage={
    'author':{
      'required':'Author Name is Required.',
      'minlength':'Author name must be a least 2 characters',
      'maxlength':'Author Name cannot be more than 25 charactes'
    },
    'comment':{
      'required':'Comment is Required.',
    
    }
  };
  
  constructor(private dishService: DishService,
    private route:ActivatedRoute,
    private location:Location,
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL
   
    ) {
      
     }

  

  ngOnInit(): void {

    

    this.createForm();
    
     this.dishService.getDishIds()
    .subscribe((dishIds)=>this.dishIds=dishIds);
     this.route.params.
     pipe(switchMap((params:Params)=>this.dishService.getDish(params['id'])))
  
    .subscribe(dish=>{this.dish=dish; this.setPrevNext(dish.id); });
  }
  setPrevNext(dishId:string){
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index -1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length + index +1)%this.dishIds.length];
  
  }
  goBack():void{
    this.location.back();
  }
  createForm(){
    this.commentForm=this.fb.group({
      author:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating:5,
      comment:['',[Validators.required, Validators.minLength(2)]]

    });
    this.commentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any){
    if(!this.commentForm){return;}
    const form= this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control= form.get(field);
        if(control && control.dirty && !control.valid){
          const messages= this.validationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key] + '';
            }
          }
        }
      }
    }
  }
  onSubmit(){
    this.comment=this.commentForm.value;
    this.comment.date=new Date().toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      author:'',
      rating:'',
      comment:''
    

    });
  
   
     this.commentFormDirective.resetForm();
  }

  

}
