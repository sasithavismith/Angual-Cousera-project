import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import{routes} from './routes';
import { from } from 'rxjs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
   exports:[
     RouterModule
   ]
})
export class AppRoutingModule { }
