import { MapService } from './../core/service/map-service';
import { Municipio } from './../core/model/municipio';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public municipioEscolhido = signal<Municipio | null>(null);

  public mostrarDetalhesMunicipios = signal(true);

  constructor(public mapService: MapService) {}

  public mostrarInformacoesMunicipios() {
    this.mostrarDetalhesMunicipios.set(true);
  }

  public mostrarInformacoesEstados() {
    this.mostrarDetalhesMunicipios.set(false);
  }
}
