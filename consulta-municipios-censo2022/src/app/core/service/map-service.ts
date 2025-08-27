import { Injectable, signal } from '@angular/core';
import { ApiService } from './api-service';
import { Municipio } from '../model/municipio';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public municipio = signal<Municipio[]>([]);
  public estado = signal<Estado[]>([]);

  constructor(private apiService: ApiService) {}

  public pesquisarMunicipio(
    atributo: string,
    valor1: string,
    valor2?: string
  ): void {
    switch (atributo) {
      case 'id':
        this.getMunicipioById(valor1);
        break;
      case 'municipio':
        this.getMunicipiosByNome(valor1);
        break;
      case 'estado':
        this.getMunicipiosByEstado(valor1);
        break;
      case 'populacao':
        this.getMunicipiosByPopulacao(valor1, valor2 ?? '');
        break;
      case 'area':
        this.getMunicipiosByArea(valor1, valor2 ?? '');
        break;
    }
  }

  public pesquisarEstado(valor: string): void {
    this.getEstadoByNome(valor);
  }

  public getMunicipios(): void {
    this.apiService.getMunicipios().subscribe((data) => {
      this.municipio.set(data);
    });
  }

  public getMunicipioById(id: string): void {
    this.apiService.getMunicipioById(id).subscribe((data) => {
      this.municipio.set([data]);
    });
  }

  public getMunicipiosByNome(municipio: string): void {
    this.apiService.getMunicipiosByNome(municipio).subscribe((data) => {
      this.municipio.set(data);
    });
  }

  public getMunicipiosByEstado(estado: string): void {
    this.apiService.getMunicipiosByEstado(estado).subscribe((data) => {
      this.municipio.set(data);
    });
  }

  public getMunicipiosByPopulacao(infLim: string, supLim: string): void {
    this.apiService
      .getMunicipiosByPopulacao(infLim, supLim)
      .subscribe((data) => {
        this.municipio.set(data);
      });
  }

  public getMunicipiosByArea(infLim: string, supLim: string): void {
    this.apiService.getMunicipiosByArea(infLim, supLim).subscribe((data) => {
      this.municipio.set(data);
    });
  }

  public getEstados(): void {
    this.apiService.getEstados().subscribe((data) => {
      this.estado.set(data);
    });
  }

  public getEstadosById(id: string): void {
    this.apiService.getEstadoById(id).subscribe((data) => {
      this.estado.set([data]);
    });
  }

  public getEstadoByNome(estado: string): void {
    this.apiService.getEstadoByNome(estado).subscribe((data) => {
      this.estado.set([data]);
    });
  }

  public getEstadosByQtde(infLim: string, supLim: string): void {
    this.apiService.getEstadosByQtde(infLim, supLim).subscribe((data) => {
      this.estado.set(data);
    });
  }

  public getEstadosByPopulacao(infLim: string, supLim: string): void {
    this.apiService.getEstadosByPopulacao(infLim, supLim).subscribe((data) => {
      this.estado.set(data);
    });
  }

  public getEstadosByArea(infLim: string, supLim: string): void {
    this.apiService.getEstadosByArea(infLim, supLim).subscribe((data) => {
      this.estado.set(data);
    });
  }
}
