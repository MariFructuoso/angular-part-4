import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'top-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], 
  templateUrl: './top-menu.html',
})
export class TopMenu {}