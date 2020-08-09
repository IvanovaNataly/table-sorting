import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  templateUrl: () => `assets/data/data.json`,
};

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get(routes.templateUrl());
  }
}
