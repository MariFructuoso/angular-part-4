import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TopMenu } from './shared/top-menu/top-menu';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TopMenu],
  templateUrl: './app.html',
  styleUrl: '../styles.css'
})
export class App {}