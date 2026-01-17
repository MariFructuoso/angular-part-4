import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PropertiesResponse, Property, PropertyInsert, SinglePropertyResponse } from '../interfaces/property';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  #http = inject(HttpClient);
  readonly #propertiesUrl = 'properties';

  propertiesResource = httpResource<PropertiesResponse>(() => this.#propertiesUrl, {
    defaultValue: { properties: [] },
  });

  addProperty(property: PropertyInsert): Observable<Property> {
    return this.#http
      .post<SinglePropertyResponse>(this.#propertiesUrl, property)
      .pipe(map((res) => res.property));
  }

  deleteProperty(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#propertiesUrl}/${id}`);
  }

  getProperty(id: number): Observable<Property> {
    return this.#http
      .get<SinglePropertyResponse>(`${this.#propertiesUrl}/${id}`)
      .pipe(map((res) => res.property));
  }
}