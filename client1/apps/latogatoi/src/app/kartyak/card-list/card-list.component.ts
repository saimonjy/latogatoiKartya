import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbServiceService, LatogatoiCsoport } from '../../db-service.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'client1-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})

export class CardListComponent implements OnInit, OnDestroy{

  public intezmenynev = "Verebély László Szakgimnázium és Szakközépiskola";
  public cards: any;
  private subscription= new Subscription;
  
  constructor(public dbService: DbServiceService){
    this.all();
   }

   ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  all(){
    this.cards = this.dbService.allLcs();
  }
  
  delete(id: any){
    if(confirm('Valóban törölni kívánja ezt a kártyát?')){
      this.subscription.add(this.dbService.delete(id).subscribe((result)=>{
        if(result.error){
          alert(result.error.message);
        }
        else{
          this.all();
        }
      }));
    }
  };
}
