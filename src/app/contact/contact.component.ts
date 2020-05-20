import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import{FormBuilder,FormGroup,Validators, ControlContainer} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback'; 
import {FeedbackService} from '../services/feedback.service';
import{flyInOut} from '../animations/app.animation';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'
      },
      animations:[
        flyInOut()
      ]
})
export class ContactComponent implements OnInit {
  feedbackForm:FormGroup;
  feedback:Feedback;
  feedbacks:Feedback[];
  contactType =ContactType;
  @ViewChild('fform') feedbackFormDirective;
  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessage={
'firstname':{
  'required':'Frist Name is Required.',
  'minlength':'First name must be a least 2 characters',
  'maxlength':'Fist Name cannot be more than 25 charactes'
},
'lastname':{
  'required':'Last Name is Required.',
  'minlength':'Last name must be a least 2 characters',
  'maxlength':'Last Name cannot be more than 25 charactes'
},
'telnum':{
  'required':'Tel. Number is Required.',
  'pattern':'Tel. Number must contain only numbers.'
},
'email':{
  'required':'Tel. Number is required.',
  'email':'Email not in valid format.'
}
  };
  constructor(private fb:FormBuilder,
    private feedbackService:FeedbackService,
    @Inject('BaseURL') public BaseURL) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(){
    this.feedbackForm=this.fb.group({
      firstname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required, Validators.pattern]],
      email:['',[Validators.required, Validators.email]],
      agree: false,
      contacttype:'None',
      message:'',
    });
     this.feedbackForm.valueChanges
     .subscribe(data=>this.onValueChanged(data));
     this.onValueChanged();
  }
  onValueChanged(data?: any){
    if(!this.feedbackForm) { return;}
     const form=this.feedbackForm;
     for(const field in this.formErrors){
       if(this.formErrors.hasOwnProperty(field)){
         this.formErrors[field]='';
         const control =form.get(field);
         if(control && control.dirty && !control.valid){
const messages=this.validationMessage[field];
for(const key in control.errors){
  if(control.errors.hasOwnProperty(key)){
    this.formErrors[field] +=messages[key]+'';
  }
}
         }
       }
     }
  }
  onSubmit(){
    this.feedback=this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback)
    .subscribe(feedback => {
      this.feedback = feedback; 
    
    
    })
   
  
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contacttype:'None',
      message:'' ,

    });
    this.feedbackFormDirective.resetForm();
}
  }
  
