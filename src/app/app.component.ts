import { Component} from '@angular/core';
import { UrlService } from './services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cdo-front';
  constructor(private urlService: UrlService) {}
}
