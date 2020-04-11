import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { Subscription, Observer, Subject } from 'rxjs';

@Component({
  selector: 'client1-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})

export class CardListComponent implements OnInit, OnDestroy{

  httpGetCards: any;
  subscription: Subscription;
  formdata = new FormData; 
  
  constructor(private dbService: DbServiceService){
    this.getAllCards();
   }
   ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if(this.subscription != null){
    this.subscription.unsubscribe();
    }
  }
  getAllCards(){
    this.httpGetCards = this.dbService.all();
  }
  delete(id){
    if(confirm('valoban törülni kivanja ezt a kártyát?')){
      this.subscription.add(this.dbService.delete(id).subscribe((result)=>{
        if(result.error){
          alert(result.error.message);
        }
        else{
          this.getAllCards();
        }
      }));
    }
  };
}
