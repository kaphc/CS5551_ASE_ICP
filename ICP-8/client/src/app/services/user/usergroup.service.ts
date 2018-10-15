import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addUserGroup(usergroup) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('usergroups/create');
    return this.http.post(url, usergroup, { headers: headers });
  }

  updateUserGroup(usergroup) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('usergroups/update/');
    url = url + `${usergroup._id}`;
    return this.http.put(url, usergroup, { headers: headers });
  }

  deleteUserGroup(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('usergroups/delete/');
    return this.http.delete(url + id,{headers: headers});
  }

  getUserGroups() {
    let headers = new HttpHeaders().set('Authorization', this.authService.getToken());
    let url = this.authService.prepEndpoint('usergroups/all/');
    return this.http.get(url,{headers: headers});
  }
}
