import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { Galeria } from '../../model/galeriaModel';

@Injectable()
export class GaleriaProvidresProvider {

  constructor(public http: HttpClient) {

  }

  buscarTodos() : Observable < Galeria[]>{
    return this.http.get<Galeria[]>(`${API_CONFIG.baseUrl}/galerias`);
   }

   insert(obj : Galeria) {
    return this.http.post(`${API_CONFIG.baseUrl}/galerias`, 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

update(obj : Galeria,id :any) {
  return this.http.put(`${API_CONFIG.baseUrl}/galerias/${id}`, 
      obj,
      { 
          observe: 'response', 
          responseType: 'text'
      }
  ); 
}

delete(id :any) {
  return this.http.delete(`${API_CONFIG.baseUrl}/galerias/${id}`
  ); 
}


}


