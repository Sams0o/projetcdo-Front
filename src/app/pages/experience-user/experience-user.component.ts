import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-experience-user',
  templateUrl: './experience-user.component.html',
  styleUrls: ['./experience-user.component.css'],
})
export class ExperienceUserComponent implements OnInit {
  experience!: Experience;
  previousUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private urlService: UrlService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const experienceId = params['id'];
      if (experienceId) {
        this.experienceService
          .getExperienceId(experienceId)
          .subscribe((data) => {
            this.experience = data;
          });
      }
    });
    this.urlService.previousUrl$.subscribe((url: string | null) => {
      this.previousUrl = url;
    });
  }

  goBack(): void {
    if (this.previousUrl) {
      this.router.navigateByUrl(this.previousUrl);
    }
  }

  getCountryDisplayList(experience: Experience): string {
    if (experience.countries.length === 0) {
      return 'Pays inconnu';
    } else if (experience.countries.length === 1) {
      return experience.countries[0].name;
    } else {
      const countryNames = experience.countries.map((country) => country.name);
      return countryNames.join(', ');
    }
  }
}
