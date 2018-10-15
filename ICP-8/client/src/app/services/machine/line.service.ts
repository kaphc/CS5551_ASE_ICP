import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addLine(line) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('line/create');
    return this.http.post(url, line, { headers: headers });
  }

  updateLine(line) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('line/update/');
    url = url + `${line._id}`;
    return this.http.put(url, line, { headers: headers });
  }

  deleteLine(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('line/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getLines() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('line/all/');
    return this.http.get(url, { headers: headers });
  }

  getLineName(searchTerm){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('line/get/');
    return this.http.get(url+searchTerm, { headers: headers });
  }
}
