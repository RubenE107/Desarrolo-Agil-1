import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${environment.API_URI}/api/carreras`);
  }

  listOne(id: any) {
    return this.http.get(`${environment.API_URI}/api/carreras/${id}`);
  }

  create(carrera: any) {
    return this.http.post(`${environment.API_URI}/api/carreras/nueva`, carrera);
  }

  update(id: any, carrera: any) {
    return this.http.put(`${environment.API_URI}/api/carreras/actualizar/${id}`, carrera);
  }

  delete(id: any) {
    return this.http.delete(`${environment.API_URI}/api/carreras/eliminar/${id}`);
  }
}