import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import{PROMOTIONS} from '../shared/promotions';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions():Promise<Promotion[]>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS), 2000);
   });
  }
   getPromotion(id: string):Promise<Promotion>{
     return new Promise(resolve=>{
       setTimeout(()=>resolve(PROMOTIONS.filter((prom)=>(prom.id===id))[0]), 2000);
   });
  }
   getFeaturedPromotion():Promise<Promotion>{
     return new Promise(resolve=>{
       setTimeout(()=>resolve(PROMOTIONS.filter((prom)=>(prom.featured))[0]), 2000);
   });
  }
 
}
