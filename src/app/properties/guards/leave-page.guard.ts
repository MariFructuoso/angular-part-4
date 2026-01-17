import { CanDeactivateFn } from '@angular/router';
import { PropertyForm } from '../properties/property-form/property-form';

export const leavePageGuard: CanDeactivateFn<PropertyForm> = (component) => {
  if (component.saved) {
    return true;
  }
  return confirm('¿Quieres abandonar la página? Los cambios no guardados se perderán.');
};