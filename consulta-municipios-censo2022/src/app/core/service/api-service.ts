import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../model/municipio';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/censo2022';

  constructor(private http: HttpClient) {}

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrl}/municipios`);
  }

  getMunicipioById(id: string): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.apiUrl}/municipios/id/${id}`);
  }

  getMunicipiosByNome(municipio: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.apiUrl}/municipios/municipio/${municipio}`
    );
  }

  getMunicipiosByEstado(estado: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.apiUrl}/municipios/estado/${estado}`
    );
  }

  getMunicipiosByPopulacao(
    infLim: string,
    supLim: string
  ): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.apiUrl}/municipios/populacao/${infLim}/${supLim}`
    );
  }

  getMunicipiosByArea(infLim: string, supLim: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.apiUrl}/municipios/area/${infLim}/${supLim}`
    );
  }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`);
  }

  getEstadoById(id: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.apiUrl}/estados/id/${id}`);
  }

  getEstadoByNome(estado: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.apiUrl}/estados/estado/${estado}`);
  }

  getEstadosByQtde(infLim: string, supLim: string): Observable<Estado[]> {
    return this.http.get<Estado[]>(
      `${this.apiUrl}/estados/qtde/${infLim}/${supLim}`
    );
  }

  getEstadosByPopulacao(infLim: string, supLim: string): Observable<Estado[]> {
    return this.http.get<Estado[]>(
      `${this.apiUrl}/estados/populacao/${infLim}/${supLim}`
    );
  }

  getEstadosByArea(infLim: string, supLim: string): Observable<Estado[]> {
    return this.http.get<Estado[]>(
      `${this.apiUrl}/estados/area/${infLim}/${supLim}`
    );
  }
}
