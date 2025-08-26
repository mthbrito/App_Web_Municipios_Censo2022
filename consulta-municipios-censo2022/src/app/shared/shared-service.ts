import { effect, Injectable, signal } from '@angular/core';
import { MapInfo } from '../core/model/map-info';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public mapInfo = signal<MapInfo | null>(null);
  showMapInfo = signal(true);

  public updateMapInfo(info: MapInfo | null) {
    this.mapInfo.set(info);
    console.log('updateMapInfo ->', info);
  }

  showInfoList() {
    this.showMapInfo.set(true);
  }

  showExtraInfoList() {
    this.showMapInfo.set(false);
  }
}
