import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { Experience } from 'src/app/models/experience';
import { CountryService } from 'src/app/services/country.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteExperienceComponent } from 'src/app/components/delete-experience/delete-experience.component';

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

  admin: boolean = false;
  userId: number | null = null;

  experienceToDeleteId!: number;
  @ViewChild('deleteModal') deleteModal!: DeleteExperienceComponent;

  clickCount = 0;

  constructor(
    private experienceService: ExperienceService,
    private countryService: CountryService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.experienceService.getExperiences().subscribe({
      next: (res) => {
        this.allExperiences = [...res];
        this.filteredCountries = this.allExperiences.filter(
          (exp) => exp.id !== undefined
        );
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

    this.extractUserId();
    if (this.userId) {
      this.userService.getUserById().subscribe({
        next: (userDetails) => {
          this.admin = userDetails.admin ?? false;
        },
        error: (err) => {
          console.error(
            "Erreur lors de la récupération des détails de l'utilisateur",
            err
          );
        },
      });
    }
  }

  extractUserId() {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      try {
        const base64Url = token.split('.')[1]; // Récupère la charge utile du token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Remplace les caractères pour Base64 standard
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split('')
            .map((c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );

        const payload = JSON.parse(jsonPayload);
        this.userId = payload.id; // Récupère l'ID de l'utilisateur
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT', error);
      }
    }
  }

  openDeleteModal(experienceId: number ) {
    this.experienceToDeleteId = experienceId;
    this.deleteModal.open();
  }

  confirmExperienceDelete(id: number) {
    this.filteredCountries = this.filteredCountries.filter(exp => exp.id !== id);
    this.deleteModal.close();
  }

  cancelExperienceDelete() {
    this.deleteModal.close();
  }


  onSearchCountries(searchInfos: string) {
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
}
