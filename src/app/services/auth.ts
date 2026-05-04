import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    let body = { email, password }
    return this.http.post(`http://localhost:3000/api/auth/login`, body);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
    // return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}
