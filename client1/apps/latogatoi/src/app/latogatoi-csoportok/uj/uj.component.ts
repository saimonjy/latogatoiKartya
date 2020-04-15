import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DbServiceService } from '../../db-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'client1-uj',
  templateUrl: './uj.component.html',
  styleUrls: ['./uj.component.css']
})
export class UjComponent implements OnInit {
  private subscription = new Subscription();
  public id = null;
  public form = new FormGroup({
    nev: new FormControl(''),
  });

  constructor(
    private db: DbServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.subscription.add(
          this.db.latogatoiCsoport(this.id)
            .subscribe((result) => {
              this.form.setValue({
                nev: result.nev,
              });
            })
        );
      }
    }));
  }

  handleRequest(result: any) {
    if (result.error) {
      alert(result.error.message);
    } else {
      this.router.navigate(['/latogatoi-csoportok'])
    }
  }

  onSubmit() {
    if (!this.id) {
      this.subscription.add(
        this.db.latogatoiCsoportHozzaadasa(this.form.value)
        .subscribe((result) => {
          this.handleRequest(result);
        })
      );
    } else {
      this.subscription.add(
        this.db.latogatoiCsoportModositasa(this.id, this.form.value)
          .subscribe((result) => {
            this.handleRequest(result);
          })
        );
    }
  }
}
