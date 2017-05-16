import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  // Register User
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/register', user, {headers: headers})
      .map(res => res.json());
  }

  // Authenticate the user
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  // Get Profile
  getProfile() {
    let headers = new Headers();
    this.loadToken(); // Load token to validate user
    headers.append('Authorization', this.authToken); // Append token to headers
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile', {headers: headers})
      .map(res => res.json());
  }

  // Update Profile
  updateUserProfile(user) {
    let headers = new Headers();
    this.loadToken(); // Load token to validate user
    headers.append('Authorization', this.authToken); // Append token to headers
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/profile', user, {headers: headers})
      .map(res => res.json());
  }

  // Store Token and User for authentication
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Load token
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Checks to see if token is not expired
  loggedIn() {
    return tokenNotExpired('id_token');
    //return tokenNotExpired;
  }

  // Logout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
