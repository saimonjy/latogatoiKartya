import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment as env }  from '../environments/environment';
import { Observable } from 'rxjs';
import { LatogatoiCsoportokModule } from './latogatoi-csoportok/latogatoi-csoportok.module';

export interface LatogatoiCsoport {
  id: number;
  nev: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  constructor(private http: HttpClient) { }
  public all(){
    return this.http.get(`${env.basePath}${env.apiPath}/kartyak/all.php`);
  }
  public get(id: String){
    return this.http
      .get<any>(`${env.basePath}${env.apiPath}/kartyak/get.php?id=${id}`);
  }
  public save(formGroup: FormGroup){
    return this.http
      .post<any>(`${env.basePath}${env.apiPath}/kartyak/new.php`,formGroup.value);
      
  }
  public update(id: String, formGroup: FormGroup){
    return this.http
      .post<any>(`${env.basePath}${env.apiPath}/kartyak/update.php?id=${id}`,formGroup.value);
      
  }
  public delete(id: String){
    return this.http
      .get<any>(`${env.basePath}${env.apiPath}/kartyak/delete.php?id=${id}`);
  }
  public latogatoiCsoportok(): Observable<LatogatoiCsoport[]> {
    return this.http
      .get<LatogatoiCsoport[]>(
        `${env.basePath}${env.apiPath}/latogatoi-csoportok/all.php`
      );
  }
  public latogatoiCsoportTorlese(id: String): Observable<any> {
    return this.http.get<any>(`${env.basePath}${env.apiPath}/latogatoi-csoportok/delete.php?id=${id}`);
  }
}
