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
  public intezmenynev = "Verebély László Szakgimnázium és Szakközépiskola";
  public id: String;
  public subscription = new Subscription;
  public vezeteknev: String;
  public latogatoiCsnev: String;
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
        this.subscription.add(this.dbService.getLcs(this.id).subscribe((result) => {
            this.vezeteknev = result.vezeteknev;
            this.keresztnev = result.keresztnev;
            this.latogatoiCsnev = result.nev;
            this.rendfokozat = result.rendfokozat;
            this.img = result.img;
        }));
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  print(): void{
    window.print();
  };

}
