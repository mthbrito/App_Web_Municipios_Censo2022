import { MapExtraInfo } from './../../../model/map-extra-info';
import { MapInfo } from './../../../model/map-info';
import { Component, effect, signal } from '@angular/core';
import { MapService } from '../../../service/map-service';
import { SharedService } from '../../../../shared/shared-service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [DecimalPipe],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  mapInfo = signal<MapInfo[]>([]);
  mapExtraInfo = signal<MapExtraInfo[]>([]);
  showMapInfo = signal(true);

  constructor(
    public mapService: MapService,
    public sharedService: SharedService
  ) {
    effect(() => {
      this.mapInfo = this.mapService.mapInfo;
    });

    effect(() => {
      this.mapExtraInfo = this.mapService.mapExtraInfo;
    });

    effect(() => {
      this.showMapInfo = this.sharedService.showMapInfo;
    });
  }
}
