import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbServiceService } from '../../db-service.service';

@Component({
  selector: 'client1-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.css']
})
export class PrintViewComponent implements OnInit , OnDestroy{
  public id: String;
  public subscription = new Subscription;
  public vezeteknev: String;
  public keresztnev: String;
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
            this.vezeteknev = result[0].vezeteknev;
            this.keresztnev = result[0].keresztnev;
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
