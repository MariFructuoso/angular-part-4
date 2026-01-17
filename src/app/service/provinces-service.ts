import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { TownsResponse } from '../interfaces/town';
import { ProvincesResponse } from '../interfaces/province';

@Injectable({
  providedIn: 'root',
})
export class ProvincesService {
  readonly provincesResource = httpResource<ProvincesResponse>(() => 'provinces', {
    defaultValue: {
      provinces: [],
    },
  });

  getTownsResource(provinceId: Signal<number>): HttpResourceRef<TownsResponse> {
    return httpResource(() => (provinceId() ? `provinces/${provinceId()}/towns` : undefined), {
      defaultValue: {
        towns: [],
      },
    });
  }
}
