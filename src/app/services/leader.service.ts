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
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS),2000);
   });

  }

   getLeader(id: string):Promise<Leader>{
     return new Promise(resolve=>{
       setTimeout(()=>resolve(LEADERS.filter((led)=>(led.id===id))[0]),2000);
     });
   }
   getFeaturedLeader():Promise<Leader>{
     return new Promise(resolve=>{
       setTimeout(()=>resolve(LEADERS.filter((led)=>(led.featured))[0]),2000);
   });
  }
 
}
