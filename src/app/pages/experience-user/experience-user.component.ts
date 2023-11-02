import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience-user',
  templateUrl: './experience-user.component.html',
  styleUrls: ['./experience-user.component.css']
})
export class ExperienceUserComponent implements OnInit {
  experience!: Experience;

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const experienceId = params['id'];
      if (experienceId) {
        this.experienceService.getExperienceId(experienceId).subscribe((data) => {
          this.experience = data;
        });
      }
    });
  }

  getCountryDisplayList(experience: Experience): string {
    if (experience.countries.length === 0) {
      return 'Pays inconnu';
    } else if (experience.countries.length === 1) {
      return experience.countries[0].name;
    } else {
      const countryNames = experience.countries.map(country => country.name);
      return countryNames.join(', ');
    }
  }
}
