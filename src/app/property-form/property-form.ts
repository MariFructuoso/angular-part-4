import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Property, PropertyInsert } from '../interfaces/property';
import { EncodeBase64Directive } from '../directives/encode-base64-directive';
import { PropertiesService } from '../service/properties-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProvincesService } from '../service/provinces-service';

@Component({
  selector: 'property-form',
  imports: [FormsModule, EncodeBase64Directive],
  templateUrl: './property-form.html',
  styleUrl: './property-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyForm {
  added = output<Property>();

  #propertiesService = inject(PropertiesService);
  #provincesService = inject(ProvincesService);
  #destroyRef = inject(DestroyRef);

  newProperty!: PropertyInsert;
  filename = '';

  provinceId = signal(0);

  provincesResource = this.#provincesService.provincesResource;
  townsResource = this.#provincesService.getTownsResource(this.provinceId);

  constructor() {
    effect(() => {
      this.provinceId();
      this.newProperty.townId = 0;
    })
    this.resetForm();
  }

  addProperty() {
    this.newProperty.townId = +this.newProperty.townId;

    this.#propertiesService
      .addProperty(this.newProperty)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((property) => {
        this.added.emit(property);
        this.resetForm();
      });
  }

  resetForm() {
    this.newProperty = {
      title: '',
      description: '',
      townId: 0,
      address: '',
      price: 0,
      numBaths: 0,
      sqmeters: 0,
      numRooms: 0,
      mainPhoto: '',
    };
    this.filename =  '';
  }
}
