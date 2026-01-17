import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Property } from '../../interfaces/property';
import { IntlCurrencyPipe } from '../../pipes/intl-currency-pipe';
import { PropertiesService } from '../../service/properties-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'property-card',
  imports: [IntlCurrencyPipe, RouterLink],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
  host: {
    class: 'bg-white rounded-lg shadow-md flex flex-col relative overflow-visible'
  }
})
export class PropertyCard {
  property = input.required<Property>();
  deleted = output<void>();
  #propertiesService = inject(PropertiesService);
  #destroyRef = inject(DestroyRef);

  deleteProperty() {
    this.#propertiesService
      .deleteProperty(this.property().id!)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.deleted.emit());
  }
}
