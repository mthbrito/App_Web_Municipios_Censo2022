import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MapInfo } from '../model/map-info';
import { MapExtraInfo } from '../model/map-extra-info';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/censo2022';

  constructor(private http: HttpClient) {}

  getDadosMunicipios(): Observable<MapInfo[]> {
    return this.http.get<MapInfo[]>(`${this.apiUrl}/municipios`);
  }

  getDadosById(id: string): Observable<MapInfo> {
    return this.http.get<MapInfo>(`${this.apiUrl}/municipios/id/${id}`);
  }

  getDadosByMunicipio(municipio: string): Observable<MapInfo[]> {
    return this.http.get<MapInfo[]>(
      `${this.apiUrl}/municipios/municipio/${municipio}`
    );
  }

  getDadosByEstado(estado: string): Observable<MapInfo[]> {
    return this.http.get<MapInfo[]>(
      `${this.apiUrl}/municipios/estado/${estado}`
    );
  }

  getDadosByPopulacao(infLim: string, supLim: string): Observable<MapInfo[]> {
    return this.http.get<MapInfo[]>(
      `${this.apiUrl}/municipios/populacao/${infLim}/${supLim}`
    );
  }

  getDadosByArea(infLim: string, supLim: string): Observable<MapInfo[]> {
    return this.http.get<MapInfo[]>(
      `${this.apiUrl}/municipios/area/${infLim}/${supLim}`
    );
  }

  getExtraDadosEstados(): Observable<MapExtraInfo[]> {
    return this.http.get<MapExtraInfo[]>(`${this.apiUrl}/estados`);
  }

  getExtraDadosById(id: string): Observable<MapExtraInfo> {
    return this.http.get<MapExtraInfo>(`${this.apiUrl}/estados/id/${id}`);
  }

  getExtraDadosByEstado(estado: string): Observable<MapExtraInfo> {
    return this.http.get<MapExtraInfo>(
      `${this.apiUrl}/estados/estado/${estado}`
    );
  }

  getExtraDadosByQtde(infLim: string, supLim: string): Observable<MapExtraInfo[]> {
    return this.http.get<MapExtraInfo[]>(
      `${this.apiUrl}/estados/qtde/${infLim}/${supLim}`
    );
  }

  getExtraDadosByPopulacao(
    infLim: string,
    supLim: string
  ): Observable<MapExtraInfo[]> {
    return this.http.get<MapExtraInfo[]>(
      `${this.apiUrl}/estados/populacao/${infLim}/${supLim}`
    );
  }

  getExtraDadosByArea(
    infLim: string,
    supLim: string
  ): Observable<MapExtraInfo[]> {
    return this.http.get<MapExtraInfo[]>(
      `${this.apiUrl}/estados/area/${infLim}/${supLim}`
    );
  }
  // getGeomMunicipios(): Observable<MapGeometry[]> {
  //   return this.http.get<MapGeometry[]>(`${this.apiUrl}/geom/municipios`);
  // }

  // getGeomById(id: string): Observable<MapGeometry> {
  //   return this.http.get<MapGeometry>(`${this.apiUrl}/geom/id/${id}`);
  // }

  // getGeomByMunicipio(municipio: string): Observable<MapGeometry[]> {
  //   return this.http.get<MapGeometry[]>(
  //     `${this.apiUrl}/geom/municipio/${municipio}`
  //   );
  // }

  // getGeomByEstado(estado: string): Observable<MapGeometry[]> {
  //   return this.http.get<MapGeometry[]>(`${this.apiUrl}/geom/estado/${estado}`);
  // }

  // getGeomByPopulacao(
  //   infLim: string,
  //   supLim: string
  // ): Observable<MapGeometry[]> {
  //   return this.http.get<MapGeometry[]>(
  //     `${this.apiUrl}/geom/populacao/${infLim}/${supLim}`
  //   );
  // }

  // getGeomByArea(infLim: string, supLim: string): Observable<MapGeometry[]> {
  //   return this.http.get<MapGeometry[]>(
  //     `${this.apiUrl}/geom/area/${infLim}/${supLim}`
  //   );
  // }
}
