import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Property } from '../interfaces/property';
import { PropertyForm } from '../property-form/property-form';
import { PropertyCard } from '../property-card/property-card';
import { PropertiesService } from '../service/properties-service';
import { ProvincesService } from '../service/provinces-service';

@Component({
  selector: 'properties-page',
  imports: [FormsModule, PropertyForm, PropertyCard],
  templateUrl: './properties-page.html',
  styleUrl: './properties-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesPage {
  search = signal('');
  province = signal('');

  #propertiesService = inject(PropertiesService);
  #provincesService = inject(ProvincesService);


  provincesResource = this.#provincesService.provincesResource;

  propertiesResource = this.#propertiesService.propertiesResource;
  properties = linkedSignal(() => this.propertiesResource.value().properties);


  filteredProperties = computed(() => {
    return this.properties().filter((property) => {
      return (
        property.title.toLowerCase().includes(this.search().toLowerCase()) &&
        property.town.province.id.toString().includes(this.province())
      );
    });
  });

  deleteProperty(property: Property) {
    this.properties.update((properties) => properties.filter((p) => p !== property));
  }

  addProperty(property: Property) {
    this.properties.update((properties) => [...properties, property]);
  }

  getFiltersText() {
    let text = '';
    if (!this.search() && !this.province()) {
      text = 'No filters applied';
    }
    text += this.search() ? `Search: ${this.search()}` : '';
    text += this.province() ? ` Province: ${this.province()}` : '';
    return text;
  }
}
