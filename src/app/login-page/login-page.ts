import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.html',
  host: {
    class: 'grow flex items-center justify-center', 
  },
})
export class LoginPage {
  #router = inject(Router);

  login() {
    this.#router.navigate(['/properties']);
  }
}