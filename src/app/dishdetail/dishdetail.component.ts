import { Component, OnInit} from '@angular/core';
import{Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { of, from } from 'rxjs';
import{delay} from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})

export class DishdetailComponent implements OnInit {
  
  dish : Dish;
  
  constructor(private dishService: DishService,
    private route:ActivatedRoute,
    private location:Location
    ) { }

  ngOnInit(): void {
    let id= this.route.snapshot.params['id'];
    this.dishService.getDish(id)
    .subscribe(dish=>this.dish=dish);
  }
  goBack():void{
    this.location.back();
  }

}
