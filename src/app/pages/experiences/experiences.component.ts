import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { Experience } from 'src/app/models/experience';
import { CountryService } from 'src/app/services/country.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
})
export class ExperiencesComponent implements OnInit {
  allExperiences!: Experience[];
  allCountries!: Country[];
  experienceToDisplay!: Experience[];
  countryToDisplay!: Country[];

  constructor(
    private experienceService: ExperienceService,
    private countryService: CountryService,
  ) {}

  ngOnInit() {
    this.experienceService.getExperiences().subscribe({
      next: (res) => {
        this.allExperiences = [...res];
        this.experienceToDisplay = [...res];
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.countryService.getCountries().subscribe({
      next: (res) => {
        this.allCountries = [...res];
        this.countryToDisplay = [...res];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
