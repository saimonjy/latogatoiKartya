import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http: HttpClient) { }

  public all(){
    return this.http.get('http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/allCards.php');
  }
  public get(id: String){
    return this.http
      .get<any>(`http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/getCard.php?id=${id}`);
  }
  public save(formGroup: FormGroup){
    return this.http
      .post<any>('http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/newCards.php',formGroup.value);
      
  }
  public update(id: String, formGroup: FormGroup){
    return this.http
      .post<any>(`http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/updateCard.php?id=${id}`,formGroup.value);
      
  }
  public delete(id: String){
    return this.http
      .get<any>(`http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/deleteCard.php?id=${id}`);
  }
}
