import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'client1-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public form = new FormGroup({
    nev: new FormControl(null),
    jelszo: new FormControl(null),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.subscription.add(
      this.auth.regisztracio(this.form.value)
        .subscribe((result) => {
          if (result.error) {
            alert(result.error.message);
          } else {
            this.router.navigate(['/']);
          }
        })
    );
  }
}
