import { MapExtraInfo } from './../../../model/map-extra-info';
import { SharedService } from './../../../../shared/shared-service';
import { Component, effect, Signal, signal } from '@angular/core';
import { MapService } from '../../../service/map-service';
import { MapInfo } from '../../../model/map-info';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  private mapInfo = signal<MapInfo[]>([]);
  private mapExtraInfo = signal<MapExtraInfo[]>([]);
  private mapInstance = signal<L.Map | null>(null);
  private highlightLayer: L.GeoJSON | null = null;
  private selectedFeature: any = null;

  constructor(
    public mapService: MapService,
    public sharedService: SharedService
  ) {
    effect(() => {
      this.mapInfo.set(this.mapService.mapInfo());
      this.renderMapLayers();
    });
    effect(() => {
      this.mapExtraInfo.set(this.mapService.mapExtraInfo());
      this.renderExtraMapLayers();
    });
    effect(() => {
      this.highlightSelectedFeature();
    });
  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.mapInstance.set(L.map('map').setView([-16, -47], 5));
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.mapInstance() as L.Map);
  }

  private renderMapLayers(): void {
    if (this.mapInstance()) {
      this.clearExistingLayers();
    }
    const layers = new L.FeatureGroup(this.createGeoJsonLayers());
    layers.addTo(this.mapInstance() as L.Map);
    this.mapInstance()?.fitBounds(layers.getBounds());
  }

  private renderExtraMapLayers(): void {
    if (this.mapInstance()) {
      this.clearExistingLayers();
    }
    const layers = new L.FeatureGroup(this.createExtraGeoJsonLayers());
    layers.addTo(this.mapInstance() as L.Map);
    this.mapInstance()?.fitBounds(layers.getBounds());
  }

  private clearExistingLayers(): void {
    const currentMap = this.mapInstance();
    if (!currentMap) return;

    currentMap.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        currentMap.removeLayer(layer);
      }
    });
  }

  private createGeoJsonLayers(): L.GeoJSON[] {
    return this.mapInfo().map((info) =>
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
          },
        } as GeoJSON.Feature,
        {
          style: { color: 'blue', weight: 2, fillOpacity: 0.2 },
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              this.selectedFeature = feature.properties;
              this.sharedService.updateMapInfo(this.selectedFeature);
              this.showCardSelectedFeature(this.selectedFeature.id);
              if (this.highlightLayer) {
                this.mapInstance()?.removeLayer(this.highlightLayer);
                this.highlightLayer = null;
              }
            });
          },
        }
      )
    );
  }

  private createExtraGeoJsonLayers(): L.GeoJSON[] {
    return this.mapExtraInfo().map((info) =>
      L.geoJSON(
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
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              this.selectedFeature = feature.properties;
              this.sharedService.updateMapInfo(this.selectedFeature);
              this.showCardSelectedFeature(this.selectedFeature.id);
              if (this.highlightLayer) {
                this.mapInstance()?.removeLayer(this.highlightLayer);
                this.highlightLayer = null;
              }
            });
          },
        }
      )
    );
  }

  private highlightSelectedFeature() {
    const info = this.sharedService.mapInfo();
    if (!info || !this.mapInstance()) {
      return;
    }
    if (this.highlightLayer) {
      this.mapInstance()?.removeLayer(this.highlightLayer);
      this.highlightLayer = null;
    }
    this.highlightLayer = L.geoJSON(
      {
        type: 'Feature',
        geometry: JSON.parse(info.geom) as GeoJSON.Geometry,
        properties: {
          id: info.id,
          municipio: info.municipio,
          estado: info.estado,
          populacao: info.populacao,
          area: info.area,
        },
      } as GeoJSON.Feature,

      {
        style: { color: 'red', weight: 3, fillOpacity: 0.5 },
      }
    );

    this.highlightLayer.addTo(this.mapInstance() as L.Map);
    this.mapInstance()?.flyToBounds(this.highlightLayer.getBounds());
  }

  private showCardSelectedFeature(id: string) {
    document
      .querySelectorAll('.card.selected-card')
      .forEach((card) => card.classList.remove('selected-card'));
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('selected-card');
    }
  }

  public onCardClick(info: any) {
    this.sharedService.updateMapInfo(info);
  }
}
