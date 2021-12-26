import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private testUrl: string;
  private result: string;
  constructor(private http: HttpClient) {
    this.testUrl = 'http://localhost:8080/api/getstr';
  }

  public getStr(): Observable<any>{
    return this.http.get(this.testUrl, {responseType: 'text'});
  }

}
