import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactRequest } from '../models/ContactRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //URL of Rest-API to be called to send email.
  private url = "https://rsbusinesstech-backend.onrender.com/contact/sendEmail";
  //private url = "http://127.0.0.1:8080/contact/sendEmail";

  //Dependency Injection of HttpClient(Constrcutor DI).
  constructor(private httpClient: HttpClient) { }

  //calling Rest-API to send email.
  sendEmail(request: ContactRequest): Observable<string>{
    return this.httpClient.post<string>(this.url,request);
  }
}
