import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oportunidade } from '../interfaces/oportunidade.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OportunidadeService {

  apiUrl = 'http://localhost:8080/oportunidades';

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Oportunidade[]>{
    return this.httpClient.get<Oportunidade[]>(this.apiUrl);
  }

  adicionar(oportunidade: any) {
    return this.httpClient.post(this.apiUrl, oportunidade);
  }

  excluir(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, oportunidade: Oportunidade): Observable<Oportunidade> {
    return this.httpClient.put<Oportunidade>(`${this.apiUrl}/${id}`, oportunidade);
  }

}
