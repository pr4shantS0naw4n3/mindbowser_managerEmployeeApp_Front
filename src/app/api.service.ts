import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  })
};

const authHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    "Authorization": "Bearer " + localStorage.getItem("token")
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:8000/";

  constructor(
    private http: HttpClient
  ) { }

  login(data) {
    return this.http.post<any>(this.baseUrl + 'api/login/', JSON.stringify(data), httpOptions)
  }

  register(data) {
    return this.http.post<any>(this.baseUrl + 'api/register/', JSON.stringify(data), httpOptions)
  }

  empGetList() {
    return this.http.get<any>(this.baseUrl + 'api/getEmployees/', authHttpOptions)
  }

  addEmployee(data) {
    return this.http.post<any>(this.baseUrl + 'api/addEmployee/', JSON.stringify(data), authHttpOptions)
  }

  updateEmployee(data) {
    return this.http.patch<any>(this.baseUrl + 'api/updateEmployee/', JSON.stringify(data), authHttpOptions)
  }

  deleteEmployee(id) {
    return this.http.delete<any>(this.baseUrl + 'api/deleteEmployee/' + id + '/', authHttpOptions)
  }


}
