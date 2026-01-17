import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PropertiesResponse, Property, PropertyInsert, SinglePropertyResponse } from '../interfaces/property';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  #http = inject(HttpClient);

  propertiesResource = httpResource<PropertiesResponse>(() => 'properties', {
    defaultValue: { properties: [] },
  });

  addProperty(property: PropertyInsert): Observable<Property> {
    return this.#http
      .post<SinglePropertyResponse>('properties', property)
      .pipe(map((res) => res.property));
  }
  deleteProperty(id: number): Observable<void> {
    return this.#http.delete<void>(`properties/${id}`);
  }
}
