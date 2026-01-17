import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyInsert } from '../../interfaces/property';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64-directive';
import { PropertiesService } from '../../service/properties-service';
import { ProvincesService } from '../../service/provinces-service';
import { Router } from '@angular/router';

@Component({
  selector: 'property-form',
  imports: [FormsModule, EncodeBase64Directive],
  templateUrl: './property-form.html',
  styleUrl: './property-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyForm {
  #router = inject(Router);
  saved = false;

  #propertiesService = inject(PropertiesService);
  #provincesService = inject(ProvincesService);

  newProperty!: PropertyInsert;
  filename = '';

  provinceId = signal(0);
  imagePreview = signal('');

  provincesResource = this.#provincesService.provincesResource;
  townsResource = this.#provincesService.getTownsResource(this.provinceId);

  constructor() {
    this.resetForm();
    effect(() => {
      this.provinceId();
      this.newProperty.townId = 0;
    })
    this.resetForm();
  }

  addProperty() {
    this.newProperty.mainPhoto = this.imagePreview();
    
    this.newProperty.townId = +this.newProperty.townId;
    this.newProperty.price = +this.newProperty.price;
    this.newProperty.numRooms = +this.newProperty.numRooms;
    this.newProperty.numBaths = +this.newProperty.numBaths;
    this.newProperty.sqmeters = +this.newProperty.sqmeters;
    
    this.#propertiesService.addProperty(this.newProperty).subscribe((newProperty) => {
      this.saved = true; 
      this.#router.navigate(['/properties', newProperty.id]);
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
