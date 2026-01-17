import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PropertiesService } from '../service/properties-service';
import { PropertyCard } from '../property-card/property-card';

@Component({
  selector: 'property-detail',
  standalone: true,
  imports: [PropertyCard],
  templateUrl: './property-detail.html',
})
export class PropertyDetail {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #propertiesService = inject(PropertiesService);

  id = signal<number>(0);

  constructor() {
    this.#route.params.subscribe((params) => {
      this.id.set(+params['id']);
    });
  }

  propertyResource = rxResource({
    request: this.id,
    loader: (params: { request: number }) => this.#propertiesService.getProperty(params.request)
  });

  goBack() {
    this.#router.navigate(['/properties']);
  }
}