import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http: HttpClient) { }

  guardarImagen(id: any, src: any) {
    return this.http.post(`${environment.API_URI_IMAGENES}/uploadImagen`, {
      "id": id,
      "src": src
    });
  }
  
  verificarImagen(id:any){
    return this.http.get(`${environment.API_URI}/usuarios/verificarImagen/${id}`);
  }
}