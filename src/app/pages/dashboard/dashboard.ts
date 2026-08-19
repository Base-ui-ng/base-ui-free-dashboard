import { Component } from '@angular/core';
import {
  AvatarComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  HoverCardComponent,
  IconComponent,
  StatCardComponent,
  TimelineComponent,
  TimelineItemComponent,
} from 'Base';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatCardComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconComponent,
    AvatarComponent,
    TimelineComponent,
    TimelineItemComponent,
    HoverCardComponent,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly revenueSeries = [28, 42, 35, 58, 49, 72, 64, 81, 70, 88, 76, 95];
  protected readonly usersSeries = [12, 14, 13, 16, 18, 17, 21, 22, 24, 23, 26, 28];
  protected readonly salesSeries = [40, 38, 42, 36, 33, 35, 32, 30, 31, 29, 28, 27];
  protected readonly conversionSeries = [2.8, 2.9, 3.0, 2.9, 3.1, 3.0, 3.2, 3.1, 3.3, 3.2, 3.3, 3.24];
}
