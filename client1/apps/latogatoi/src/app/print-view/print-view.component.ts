import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'client1-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.css']
})
export class PrintViewComponent implements OnInit , OnDestroy{
  public id: String;
  public subscription = new Subscription;
  public elotag: String;
  public vezeteknev: String;
  public keresztnev: String;
  public intezmeny_nev: String;
  public rendfokozat: String;
  public img: String;

  constructor(
    private route: ActivatedRoute,
    private dbService: DbServiceService,
    
    ) { }

  ngOnInit(): void {
    this.subscription.add(this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.subscription.add(this.dbService.get(this.id).subscribe((result) => {
            this.elotag = result[0].elotag;
            this.vezeteknev = result[0].vezeteknev;
            this.keresztnev = result[0].keresztnev;
            this.intezmeny_nev = result[0].intezmeny_nev;
            this.rendfokozat = result[0].rendfokozat;
            this.img = result[0].img;
        }));
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
