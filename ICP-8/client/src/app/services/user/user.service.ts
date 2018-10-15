import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addUser(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('users/create');
    return this.http.post(url, user, { headers: headers });
  }

  updateUser(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('users/update/');
    url = url + `${user._id}`;
    return this.http.put(url, user, { headers: headers });
  }

  deleteUser(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('users/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getUsers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('users/all/');
    return this.http.get(url, { headers: headers });
  }

  getUserName(searchTerm){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('users/get/');
    return this.http.get(url+searchTerm, { headers: headers });
  }
}
