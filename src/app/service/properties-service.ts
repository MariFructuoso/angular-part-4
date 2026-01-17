import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { PropertiesResponse, Property, PropertyInsert, SinglePropertyResponse } from '../interfaces/property';
import { map, Observable, tap } from 'rxjs';

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
      .pipe(
        map((res) => res.property),
        tap(() => this.propertiesResource.reload()) 
      );
  }

  deleteProperty(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#propertiesUrl}/${id}`).pipe(
      tap(() => this.propertiesResource.reload())
    );
  }

  getPropertyResource(id: Signal<number>) {
    return httpResource<SinglePropertyResponse>(() => {
      if (id() < 1) return undefined;
      return `${this.#propertiesUrl}/${id()}`;
    });
  }
}