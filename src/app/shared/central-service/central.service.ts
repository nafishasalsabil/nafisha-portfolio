import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  constructor(private http: HttpClient) {
  }

  getProjects(){
      return this.http.get('assets/projects.json');
  }
}
