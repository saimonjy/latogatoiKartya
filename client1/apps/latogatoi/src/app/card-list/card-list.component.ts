import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'client1-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})

export class CardListComponent implements OnInit, OnDestroy{

  public httpGetCards: any;
  private subscription= new Subscription;
  
  constructor(private dbService: DbServiceService){
    this.getAllCards();
   }

   ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllCards(){
    this.httpGetCards = this.dbService.all();
  }
  
  delete(id: any){
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
