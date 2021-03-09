import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { DocumentModel } from '../models/document.model';

import { tokenGetter } from '../app.module';


@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  public apiURL: string = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private https: HttpClient) { }

  public LoginUser(login_data: Login) {
    return this.https.post(`${this.apiURL}/token/authenticate`, login_data, {headers: this.headers});
  }

  public GetDocuments(payload:Partial<DocumentModel>) { 
    let token = localStorage.getItem('token')
    this.headers = this.headers.append('access-token', token);
    return this.https.post(`${this.apiURL}/scans/scanDocByTenent`,payload,{headers : this.headers});
  }

  public GetDocumentDetails(id:string) { 
    let token = localStorage.getItem('token')
    this.headers = this.headers.append('access-token', token);
    return this.https.get(`${this.apiURL}/scans/allScanByDocumentId/${id}`,{headers : this.headers});
  }

}


