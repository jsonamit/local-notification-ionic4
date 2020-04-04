import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public apiUrl = `${environment.baseUrl}`;
  
  get(url: string): Observable<any> {
    var urlStr = this.apiUrl + url;
    return this.http.get(urlStr);
    
  }

  post(url: string, body): Observable<any> {   
    var urlStr = this.apiUrl + url;
    return this.http.post(urlStr, body);
  }

  put(url: string, body): Observable<any> {
     var urlStr = this.apiUrl + url;
     return this.http.put(urlStr, body);
  }

  delete(url: string): Observable<any> {
    var urlStr = this.apiUrl + url;
    return this.http.delete(urlStr);
  }
}
