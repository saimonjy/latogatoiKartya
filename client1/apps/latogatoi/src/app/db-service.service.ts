import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http: HttpClient) { }

  all(){
    return this.http.get('http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/allCards.php');
  }
  get(id: String){
    console.log('delete service:' + id);
    return this.http
      // beagyaztuk/kozbeszurtuk az id valtozot az url stringjebe?=${id} `` hasznalj!!!
      .get<any>(`http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/getCard.php?id=${id}`);
  }
  save(formGroup: FormGroup){
    return this.http
      .post<any>('http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/newCards.php',formGroup.value);
      
  }
  update(id: String, formGroup: FormGroup){
    return this.http
      .post<any>(`http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/updateCard.php?id=${id}`,formGroup.value);
      
  }
  delete(id: String){
    console.log('delete service:' + id);
    return this.http
      // beagyaztuk/kozbeszurtuk az id valtozot az url stringjebe?=${id} `` hasznalj!!!
      .get<any>(`http://localhost/rendeszeti/Poc/latogatoikartya/server/database/querys/deleteCard.php?id=${id}`);
  }
}
