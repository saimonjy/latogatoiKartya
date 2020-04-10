import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { format } from 'url';


@Component({
  selector: 'client1-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit, OnDestroy{
  // subscription egy valtozo aminek a tipusa Subscription. ehhez a valtozohoz hozza tudom addni az'.add.'-al az osszes feliratkozast
  //amirol egyben le tudok iratkozni
  subscription = new Subscription();
  saveSubscription:Subscription;
  updateSubscription:Subscription;
  idSubscription: Subscription;
  id: String;
  cardForm = new FormGroup({
    elotag: new FormControl(null),
    vezeteknev: new FormControl(null),
    keresztnev: new FormControl(null),
    intezmeny_nev: new FormControl(null),
    rendfokozat: new FormControl(null),
    img: new FormControl(null),
  });
  

  constructor(private dbService:DbServiceService, private route: ActivatedRoute, private router: Router) { }
  goCardListComponent(){
    this.router.navigate(['/']);
  }
  onSubmit(): void {
    if(!this.id){
      // feliratkozom
      
      this.saveSubscription = this.dbService.save(this.cardForm).subscribe((result)=>{
        console.log(result);
      });
      console.log('save');
    }
    else{
      this.updateSubscription = this.dbService.update(this.id, this.cardForm).subscribe((result)=>{
        console.log(result);
        if(result.error){
          alert(result.error.message);
        }
        else{
          this.goCardListComponent();
        }
        
      });
    }
    
  }
  ngOnInit(): void {
    console.log('newCardComponent init');
    //feliraatkozom visszater azzal az idvel amit az app-routig moduleban kertem hogy adja hozza a cimsorba
    this.idSubscription= this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      console.log('parameterek: ' + params.get('id'));
      if(this.id){
        this.subscription.add(this.dbService.get(this.id).subscribe((result)=>{
          //a CardForm.setValue- nak atadhato a teljes json ha minden eleme benne van a formban.
          this.cardForm.setValue({
            elotag: result[0].elotag,
            vezeteknev: result[0].vezeteknev,
            keresztnev: result[0].keresztnev,
            intezmeny_nev: result[0].intezmeny_nev,
            rendfokozat: result[0].rendfokozat,
            img: result[0].img,
          });
        })); 
        
      }
    });
    
    // this.subscription.add(this.route.paramMap.subscribe((params)=>{
    //   this.id = params.get('id');
    //   console.log(params.get('id'));
    // }));
  }
  ngOnDestroy(): void {
    console.log('newCardComponent destroy');
    // minden feliratkozasrol egyben leiratkozom
    // this.subscription.unsubscribe();
    if(this.saveSubscription){
      this.saveSubscription.unsubscribe();
    }
    if(this.updateSubscription){
      this.updateSubscription.unsubscribe();

    }
    if(this.idSubscription){
      this.idSubscription.unsubscribe();
    }
    
  }
}
