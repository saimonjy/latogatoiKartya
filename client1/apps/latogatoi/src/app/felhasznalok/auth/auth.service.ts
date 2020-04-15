import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env }  from '../../../environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export interface BejelentkezesiStatusz {
  loggedIn: boolean;
}

export interface Felhasznalo {
  nev: string;
  jelszo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public bejelentkezve = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  beVanJelentkezve(): Observable<BejelentkezesiStatusz> {
    return this.http
      .get<BejelentkezesiStatusz>(
        `${env.basePath}${env.apiPath}/felhasznalok/loggedin.php`
      );
  }

  public regisztracio(felhasznalo: Felhasznalo): Observable<any> {
    return this.http.post<any>(
      `${env.basePath}${env.apiPath}/felhasznalok/register.php`,
      felhasznalo,
    );
  }

  public bejelentkezes(felhasznalo: Felhasznalo): Observable<any> {
    return this.http.post<any>(
      `${env.basePath}${env.apiPath}/felhasznalok/login.php`,
      felhasznalo,
    );
  }
  public kijelentkezes(): Observable<any> {
    return this.http.get<any>(
      `${env.basePath}${env.apiPath}/felhasznalok/logout.php`,
    );
  }
}
