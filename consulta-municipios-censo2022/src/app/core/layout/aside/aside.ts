import { SharedService } from './../../../shared/shared-service';
import { Component } from '@angular/core';
import { MapService } from '../../service/map-service';

@Component({
  selector: 'app-aside',
  imports: [],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  norte = ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'];
  nordeste = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];
  centroOeste = ['DF', 'GO', 'MT', 'MS'];
  sudeste = ['ES', 'MG', 'RJ', 'SP'];
  sul = ['PR', 'RS', 'SC'];

  constructor(
    public mapService: MapService,
    public sharedService: SharedService
  ) {}

  onClick(valor: string) {
    this.mapService.pesquisarEstado(valor);
    this.sharedService.mostrarInformacoesEstados();
  }
}
