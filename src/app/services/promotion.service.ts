import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import{HttpClient} from '@angular/common/http';
import{baseURL} from '../shared/baseurl';
import { of, Observable } from 'rxjs';
import{catchError, map} from 'rxjs/operators';
import{ProcessHTTPMsgService}  from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
 
  }
   getPromotion(id: string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promptiones/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }
   getFeaturedPromotion():Observable<Promotion>{
     return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
     .pipe(map(promotions=> promotions[0]))
     .pipe(catchError(this.processHTTPMsgService.handleError));
   
  }
 
}
