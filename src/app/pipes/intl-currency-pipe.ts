import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intlCurrency'
})
export class IntlCurrencyPipe implements PipeTransform {

  transform(price: number, currency = 'EUR', lang = 'es-ES', maximumFractionDigits = 0): string {
    return new Intl.NumberFormat(lang, { style:"currency" ,currency, maximumFractionDigits }).format(price);
  }

}
