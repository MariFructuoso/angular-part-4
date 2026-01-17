import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from '../../service/properties-service';
import { PropertyCard } from '../property-card/property-card';
import { Title } from '@angular/platform-browser';

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
  #titleSerive = inject(Title);

  id = signal<number>(0);

  propertyResource = this.#propertiesService.getPropertyResource(this.id);
  property = computed(() => this.propertyResource.value()?.property);

  constructor() {
    this.#titleSerive.setTitle("Details");
    this.#route.params.subscribe((params) => {
      this.id.set(+params['id']);
    });
  }

  goBack() {
    this.#router.navigate(['/properties']);
  }
}