import { Municipio } from './../../../model/municipio';
import { Component, effect, signal } from '@angular/core';
import { MapService } from '../../../service/map-service';
import { SharedService } from '../../../../shared/shared-service';
import { DecimalPipe } from '@angular/common';
import { Estado } from '../../../model/estado';

@Component({
  selector: 'app-details',
  imports: [DecimalPipe],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public municipio = signal<Municipio[]>([]);
  public estado = signal<Estado[]>([]);
  public mostrarDetalhesMunicipios = signal(true);
  public counter = 0;

  constructor(
    public mapService: MapService,
    public sharedService: SharedService
  ) {
    effect(() => {
      this.municipio = this.mapService.municipio;
    });

    effect(() => {
      this.estado = this.mapService.estado;
    });

    effect(() => {
      this.mostrarDetalhesMunicipios =
        this.sharedService.mostrarDetalhesMunicipios;
    });
  }

  atualizarMunicipioEscolhido(municipio: Municipio) {
    this.sharedService.municipioEscolhido.set(municipio);
  }
}
