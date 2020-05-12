import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<Leader[]>{
    return Promise.resolve(LEADERS);
   }
   getLeader(id: string):Promise<Leader>{
     return Promise.resolve(LEADERS.filter((led)=>(led.id===id))[0]);
   }
   getFeaturedLeader():Promise<Leader>{
     return Promise.resolve(LEADERS.filter((led)=>(led.featured))[0]);
   }
 
}
