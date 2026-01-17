import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Property } from '../interfaces/property';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';
import { PropertiesService } from '../service/properties-service';

@Component({
  selector: 'property-card',
  imports: [IntlCurrencyPipe],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
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
