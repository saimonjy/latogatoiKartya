import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbServiceService, LatogatoiCsoport } from '../../db-service.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'client1-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public latogatoiCsoportok: Observable<LatogatoiCsoport[]> = this.db.latogatoiCsoportok();
  constructor(private db: DbServiceService) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  torles(id: string) {
    this.subscription.add(this.db.latogatoiCsoportTorlese(id).subscribe((result) => {
      this.latogatoiCsoportok = this.db.latogatoiCsoportok();
    }));
  }
}
