import { SharedService } from './../../../shared/shared-service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MapService } from '../../service/map-service';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  entrada = new FormGroup({
    atributo: new FormControl(''),
    valor1: new FormControl(''),
    valor2: new FormControl(''),
  });

  constructor(
    public mapService: MapService,
    public sharedService: SharedService
  ) {}

  onSubmit(): void {
    const { atributo, valor1, valor2 } = this.entrada.value;
    this.mapService.pesquisarMunicipio(
      atributo ?? '',
      valor1 ?? '',
      valor2 ?? ''
    );
    this.sharedService.mostrarInformacoesMunicipios();
  }
}
