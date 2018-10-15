import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addReason(reason) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('reason/create');
    return this.http.post(url, reason, { headers: headers });
  }

  updateReason(reason) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('reason/update/');
    url = url + `${reason._id}`;
    return this.http.put(url, reason, { headers: headers });
  }

  deleteReason(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('reason/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getAllReasons() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('reason/all/');
    return this.http.get(url, { headers: headers });
  }
}
