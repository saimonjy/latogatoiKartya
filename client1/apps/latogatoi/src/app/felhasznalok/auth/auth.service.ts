import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env }  from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface BejelentkezesiStatusz {
  loggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public bejelentkezve: boolean;

  constructor(private http: HttpClient) { }

  beVanJelentkezve(): Observable<BejelentkezesiStatusz> {
    return this.http
      .get<BejelentkezesiStatusz>(
        `${env.basePath}${env.apiPath}/felhasznalok/loggedin.php`
      );
  }
}
