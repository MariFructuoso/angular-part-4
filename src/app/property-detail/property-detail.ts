import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PropertiesService } from '../service/properties-service';
import { Property } from '../interfaces/property';
import { PropertyCard } from '../property-card/property-card'; // Importamos la Card

@Component({
  selector: 'property-detail',
  standalone: true,
  imports: [PropertyCard], // La añadimos aquí
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

  propertyResource = rxResource<Property, number>({
    request: this.id,
    loader: ({ request: id }) => this.#propertiesService.getProperty(id)
  });

  goBack() {
    this.#router.navigate(['/properties']);
  }
}