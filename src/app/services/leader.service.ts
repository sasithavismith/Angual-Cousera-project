import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Leader[]{
    return LEADERS;
   }
   getLeader(id: string):Leader{
     return LEADERS.filter((led)=>(led.id===id))[0];
   }
   getFeaturedLeader():Leader{
     return LEADERS.filter((led)=>(led.featured))[0];
   }
 
}
