import { Municipio } from './../../../model/municipio';
import { SharedService } from './../../../../shared/shared-service';
import { Component, effect, signal } from '@angular/core';
import { MapService } from '../../../service/map-service';
import * as L from 'leaflet';
import { Estado } from '../../../model/estado';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  private mapa = signal<L.Map | null>(null);
  private municipio = signal<Municipio[]>([]);
  private estado = signal<Estado[]>([]);
  private camadaDestacada = signal<L.GeoJSON | null>(null);

  constructor(
    public mapService: MapService,
    public sharedService: SharedService
  ) {
    effect(() => {
      this.municipio = this.mapService.municipio;
      this.renderizarMapaMunicipio();
    });
    effect(() => {
      this.estado = this.mapService.estado;
      this.renderizarMapaEstado();
    });
    effect(() => {
      const municipio = this.sharedService.municipioEscolhido();
      if (!municipio) return;
      const camada = this.getCamadaById(municipio.id.toString());
      if (!camada) return;
      this.destacarCamada(camada);
      this.mostrarCard(municipio);
    });
  }

  ngOnInit(): void {
    this.inicializarMapa();
  }

  private inicializarMapa(): void {
    this.mapa.set(L.map('map').setView([-16, -47], 5));
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.mapa() as L.Map);
  }

  private renderizarMapaMunicipio(): void {
    if (this.mapa()) {
      this.limparCamadasExistentes();
    }
    const camadas = this.criarCamadasMapaMunicipio();
    if (!camadas || camadas.length === 0) {
      return;
    }
    this.adicionarInteratividadeMapaMunicipio(camadas);
    const camadasGrupo = new L.FeatureGroup(camadas).addTo(
      this.mapa() as L.Map
    );
    this.mapa()?.fitBounds(camadasGrupo.getBounds());
  }

  private renderizarMapaEstado(): void {
    if (this.mapa()) {
      this.limparCamadasExistentes();
    }
    const camada = this.criarCamadaMapaEstado();
    if (!camada) return;
    camada.addTo(this.mapa() as L.Map);
    this.mapa()?.fitBounds(camada.getBounds());
  }

  private limparCamadasExistentes(): void {
    const mapaAtual = this.mapa();
    if (!mapaAtual) return;
    mapaAtual.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        mapaAtual.removeLayer(layer);
      }
    });
  }

  private criarCamadasMapaMunicipio(): L.GeoJSON[] {
    return this.municipio().map((info) =>
      L.geoJSON(
        {
          type: 'Feature',
          geometry: JSON.parse(info.geom) as GeoJSON.Geometry,
          properties: {
            id: info.id,
            municipio: info.municipio,
            estado: info.estado,
            populacao: info.populacao,
            area: info.area,
            geom: info.geom,
          },
        } as GeoJSON.Feature,
        {
          style: { color: 'blue', weight: 1, fillOpacity: 0.2 },
        }
      )
    );
  }

  private criarCamadaMapaEstado(): L.GeoJSON | null {
    const estados = this.estado();
    if (!estados || estados.length === 0) {
      return null;
    }
    const info = estados[0];
    return L.geoJSON(
      {
        type: 'Feature',
        geometry: JSON.parse(info.geom) as GeoJSON.Geometry,
        properties: {
          id: info.id,
          estado: info.estado,
          qtde: info.qtde,
          populacao: info.populacao,
          area: info.area,
        },
      } as GeoJSON.Feature,
      {
        style: { color: 'blue', weight: 2, fillOpacity: 0.2 },
      }
    );
  }

  private adicionarInteratividadeMapaMunicipio(camadas: L.GeoJSON[]) {
    camadas.forEach((camada) => {
      camada.on('click', (e) => {
        const propriedades = e.propagatedFrom.feature.properties;
        const municipio: Municipio = {
          id: propriedades.id,
          municipio: propriedades.municipio,
          estado: propriedades.estado,
          populacao: propriedades.populacao,
          area: propriedades.area,
          geom: propriedades.geom,
        };
        this.sharedService.municipioEscolhido.set(municipio);
        this.destacarCamada(camada);
      });
    });
  }

  private destacarCamada(camada: L.GeoJSON | null) {
    if (!camada) {
      return;
    }
    if (this.camadaDestacada()) {
      this.camadaDestacada()?.setStyle({
        color: 'blue',
        weight: 2,
        fillOpacity: 0.2,
      });
    }
    camada.setStyle({ color: 'red', weight: 3, fillOpacity: 0.4 });
    camada.bringToFront();
    this.camadaDestacada.set(camada);
    const mapaAtual = this.mapa();
    if (mapaAtual) {
      mapaAtual.flyToBounds(camada.getBounds(), {
        duration: 1.0,
        padding: [150, 150],
      });
    }
  }

  private getCamadaById(id: string): L.GeoJSON | null {
    let camada: L.GeoJSON | null = null;
    this.mapa()?.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        layer.eachLayer((subLayer: any) => {
          if (subLayer.feature?.properties?.id?.toString() === id) {
            camada = layer;
          }
        });
      }
    });
    return camada;
  }

  private mostrarCard(municipio: Municipio) {
    document
      .querySelectorAll('.card.selected-card')
      .forEach((card) => card.classList.remove('selected-card'));
    const card = document.querySelector(`.card[data-id="${municipio.id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('selected-card');
    }
  }
}
