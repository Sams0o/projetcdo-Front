import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { Experience } from 'src/app/models/experience';
import { CountryService } from 'src/app/services/country.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
})
export class ExperiencesComponent implements OnInit {
  allExperiences!: Experience[];
  allCountries!: Country[];
  countryToDisplay!: Country[];

  filteredCountries: Experience[] = [];
  searchInfos!: string;

  clickCount = 0;

  constructor(
    private experienceService: ExperienceService,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.experienceService.getExperiences().subscribe({
      next: (res) => {
        console.log('Expériences chargées :', res);
        this.allExperiences = [...res];
        this.filteredCountries = [...this.allExperiences];
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.countryService.getCountries().subscribe({
      next: (res) => {
        console.log('Pays chargés :', res);
        this.allCountries = [...res];
        this.countryToDisplay = [...res];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSearchCountries(searchInfos: string) {
    console.log('Recherche pour :', searchInfos);
    if (searchInfos) {
      this.filteredCountries = this.allExperiences.filter((exp) => {
        // Vérifier si la recherche correspond au mot "Roadtrip"
        const isRoadtripSearch = 'roadtrip'.startsWith(
          searchInfos.toLowerCase()
        );

        // Filtre pour "Roadtrip" ou pays spécifique
        return isRoadtripSearch
          ? exp.countries.length > 1
          : exp.countries.some((country) =>
              country.name.toLowerCase().includes(searchInfos.toLowerCase())
            );
      });
    } else {
      this.filteredCountries = [...this.allExperiences];
    }
    console.log('Résultats du filtre :', this.filteredCountries);
  }

  isUserLoggedIn(): boolean {
    const jwtToken = localStorage.getItem('token');
    return !!jwtToken;
  }

  onUserClick(): void {
    console.log('Bouton cliqué');
    if (!this.isUserLoggedIn()) {
      this.clickCount++;
      console.log('Compteur de clics :', this.clickCount);
      if (this.clickCount >= 5) {
        this.router.navigate(['/connexion/register']);
        this.clickCount = 0; // Réinitialise le compteur
      }
    }
  }

  // navigateOtherPage(idExperience: number | undefined) {
  //   if (idExperience) {
  //     this.router.navigate([`/experience-user`], {
  //       queryParams: { id: idExperience },
  //     });
  //     this.urlService.myPreviousUrl = '/experience';
  //     this.urlService.myCurrentUrl = '/experience-user';
  //   }
  // }
}
