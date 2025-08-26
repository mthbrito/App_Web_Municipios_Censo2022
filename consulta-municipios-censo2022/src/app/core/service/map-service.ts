import { MapInfo } from './../model/map-info';
import { Injectable, signal, Signal } from '@angular/core';
import { ApiService } from './api-service';
import * as L from 'leaflet';
import { MapExtraInfo } from '../model/map-extra-info';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public mapInfo = signal<MapInfo[]>([]);
  public mapExtraInfo = signal<MapExtraInfo[]>([]);

  constructor(private apiService: ApiService) {}

  public getDadosMunicipios(): void {
    this.apiService.getDadosMunicipios().subscribe((data) => {
      this.mapInfo.set(data);
    });
  }

  public getDadosById(id: string): void {
    this.apiService.getDadosById(id).subscribe((data) => {
      this.mapInfo.set([data]);
    });
  }

  public getDadosByMunicipio(municipio: string): void {
    this.apiService.getDadosByMunicipio(municipio).subscribe((data) => {
      this.mapInfo.set(data);
    });
  }

  public getDadosByEstado(estado: string): void {
    this.apiService.getDadosByEstado(estado).subscribe((data) => {
      this.mapInfo.set(data);
    });
  }

  public getDadosByPopulacao(infLim: string, supLim: string): void {
    this.apiService.getDadosByPopulacao(infLim, supLim).subscribe((data) => {
      this.mapInfo.set(data);
    });
  }

  public getDadosByArea(infLim: string, supLim: string): void {
    this.apiService.getDadosByArea(infLim, supLim).subscribe((data) => {
      this.mapInfo.set(data);
    });
  }

  public pesquisar(atributo: string, valor1: string, valor2?: string): void {
    switch (atributo) {
      case 'id':
        this.getDadosById(valor1);
        break;
      case 'municipio':
        this.getDadosByMunicipio(valor1);
        break;
      case 'estado':
        this.getDadosByEstado(valor1);
        break;
      case 'populacao':
        this.getDadosByPopulacao(valor1, valor2 ?? '');
        break;
      case 'area':
        this.getDadosByArea(valor1, valor2 ?? '');
        break;
    }
  }

  public getExtraDadosEstados(): void {
    this.apiService.getExtraDadosEstados().subscribe((data) => {
      this.mapExtraInfo.set(data);
    });
  }

  public getExtraDadosById(id: string): void {
    this.apiService.getExtraDadosById(id).subscribe((data) => {
      this.mapExtraInfo.set([data]);
    });
  }

  public getExtraDadosByEstado(estado: string): void {
    this.apiService.getExtraDadosByEstado(estado).subscribe((data) => {
      this.mapExtraInfo.set([data]);
    });
  }

  public getExtraDadosByQtde(infLim: string, supLim: string): void {
    this.apiService.getExtraDadosByQtde(infLim, supLim).subscribe((data) => {
      this.mapExtraInfo.set(data);
    });
  }

  public getExtraDadosByPopulacao(infLim: string, supLim: string): void {
    this.apiService
      .getExtraDadosByPopulacao(infLim, supLim)
      .subscribe((data) => {
        this.mapExtraInfo.set(data);
      });
  }

  public getExtraDadosByArea(infLim: string, supLim: string): void {
    this.apiService.getExtraDadosByArea(infLim, supLim).subscribe((data) => {
      this.mapExtraInfo.set(data);
    });
  }
}
