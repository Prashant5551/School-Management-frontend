import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) { }

  getNotices() {
    // return this.http.get(`${environment.apiUrl}/notice`);
    return this.http.get(`http://localhost:3000/api/notice`);
  }

  getEvents() {
    // return this.http.get(`${environment.apiUrl}/event`);
    return this.http.get(`http://localhost:3000/api/event`);
  }

  getGallary() {
    // return this.http.get(`${environment.apiUrl}/gallery`);
    return this.http.get(`http://localhost:3000/api/gallery`);
  }

  getTeachers() {
    // return this.http.get(`${environment.apiUrl}/teacher`);
    return this.http.get(`http://localhost:3000/api/teacher`);
  }

  submitForm(formData: any) {
    // return this.http.post(`${environment.apiUrl}/contact`, formData);
    return this.http.post(`http://localhost:3000/api/contact`, formData);
  }

}
