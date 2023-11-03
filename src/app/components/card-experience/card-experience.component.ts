import { Component, Input } from '@angular/core';
import { Country } from 'src/app/models/country';
import { Experience } from 'src/app/models/experience';
import { CountryService } from 'src/app/services/country.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.css'],
})
export class CardExperienceComponent {
  @Input() allExperiences: Experience[] = [];

  constructor(

  ) {}

}
