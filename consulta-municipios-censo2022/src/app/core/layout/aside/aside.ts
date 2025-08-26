import { SharedService } from './../../../shared/shared-service';
import { Component, effect, signal } from '@angular/core';
import { MapInfo } from '../../model/map-info';
import { MapService } from '../../service/map-service';
import { MapExtraInfo } from '../../model/map-extra-info';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-aside',
  imports: [],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  public mapExtraInfo = signal<MapExtraInfo[]>([]);

  // estados = [
  //   'AC',
  //   'AL',
  //   'AM',
  //   'AP',
  //   'BA',
  //   'CE',
  //   'DF',
  //   'ES',
  //   'GO',
  //   'MA',
  //   'MG',
  //   'MT',
  //   'MS',
  //   'PA',
  //   'PB',
  //   'PE',
  //   'PI',
  //   'PR',
  //   'RJ',
  //   'RN',
  //   'RO',
  //   'RR',
  //   'RS',
  //   'SC',
  //   'SE',
  //   'SP',
  //   'TO',
  // ];

  norte = ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'];
  nordeste = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];
  centroOeste = ['DF', 'GO', 'MT', 'MS'];
  sudeste = ['ES', 'MG', 'RJ', 'SP'];
  sul = ['PR', 'RS', 'SC'];

  constructor(
    private mapService: MapService,
    public sharedService: SharedService
  ) {
    this.mapExtraInfo = this.mapService.mapExtraInfo;
  }

  getMapExtraInfo(estado: string): void {
    this.mapService.getExtraDadosByEstado(estado);
  }

  onEstadoClick(estado: string) {
    this.getMapExtraInfo(estado);
    this.sharedService.showExtraInfoList();
  }

  states: { [uf: string]: () => void } = {
    AC: () => this.mapService.getDadosByEstado('AC'),
    AL: () => this.mapService.getDadosByEstado('AL'),
    AP: () => this.mapService.getDadosByEstado('AP'),
    AM: () => this.mapService.getDadosByEstado('AM'),
    BA: () => this.mapService.getDadosByEstado('BA'),
    CE: () => this.mapService.getDadosByEstado('CE'),
    DF: () => this.mapService.getDadosByEstado('DF'),
    ES: () => this.mapService.getDadosByEstado('ES'),
    GO: () => this.mapService.getDadosByEstado('GO'),
    MA: () => this.mapService.getDadosByEstado('MA'),
    MT: () => this.mapService.getDadosByEstado('MT'),
    MS: () => this.mapService.getDadosByEstado('MS'),
    MG: () => this.mapService.getDadosByEstado('MG'),
    PA: () => this.mapService.getDadosByEstado('PA'),
    PB: () => this.mapService.getDadosByEstado('PB'),
    PR: () => this.mapService.getDadosByEstado('PR'),
    PE: () => this.mapService.getDadosByEstado('PE'),
    PI: () => this.mapService.getDadosByEstado('PI'),
    RJ: () => this.mapService.getDadosByEstado('RJ'),
    RN: () => this.mapService.getDadosByEstado('RN'),
    RS: () => this.mapService.getDadosByEstado('RS'),
    RO: () => this.mapService.getDadosByEstado('RO'),
    RR: () => this.mapService.getDadosByEstado('RR'),
    SC: () => this.mapService.getDadosByEstado('SC'),
    SP: () => this.mapService.getDadosByEstado('SP'),
    SE: () => this.mapService.getDadosByEstado('SE'),
    TO: () => this.mapService.getDadosByEstado('TO'),
  };

  // newMapInfo = this.mapInfo.forEach();
}
