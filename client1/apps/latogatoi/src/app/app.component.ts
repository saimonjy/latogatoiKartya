import { Component } from '@angular/core';
import { AuthService } from './felhasznalok/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'client1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private subscription = new Subscription();
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  kijelentkezes() {
    this.auth.bejelentkezve = false;
    this.subscription.add(
      this.auth.kijelentkezes().subscribe((result) => {
        if (result.sikeres) {
          this.router.navigate(['/bejelentkezes']);
        } else {
          alert('sikertelen kijelentkezes');
        }
      })
    );
  }
}
