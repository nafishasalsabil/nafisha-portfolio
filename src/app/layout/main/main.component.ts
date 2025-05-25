import {Component} from '@angular/core';
import {TopbarComponent} from '../topbar/topbar/topbar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [
    TopbarComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
}
