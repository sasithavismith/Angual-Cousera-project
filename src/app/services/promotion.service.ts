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
    return Promise.resolve(PROMOTIONS);
   }
   getPromotion(id: string):Promise<Promotion>{
     return Promise.resolve(PROMOTIONS.filter((prom)=>(prom.id===id))[0]);
   }
   getFeaturedPromotion():Promise<Promotion>{
     return Promise.resolve(PROMOTIONS.filter((prom)=>(prom.featured))[0]);
   }
 
}
