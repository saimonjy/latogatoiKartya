import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { Subscription, Observer, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'client1-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})

export class CardListComponent implements OnInit, OnDestroy{


  httpGetCards: any;
  deleteSubscription: Subscription;
  formdata = new FormData; 
  
  constructor(private dbService: DbServiceService, private router: Router){
    this.getAllCards();
   }

  getAllCards(){
    this.httpGetCards = this.dbService.all();
  }
  delete(id){
    if(confirm('valoban törülni kivanja ezt a kártyát?')){
      this.deleteSubscription = this.dbService.delete(id).subscribe((result)=>{
        console.log(result);
        if(result.error){
          alert(result.error.message);
        }
        else{
          this.getAllCards();
        }
      });
    }
    console.log('delete:' + id); 
  };

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if(this.deleteSubscription != null){
    this.deleteSubscription.unsubscribe();
    }
  }
}
