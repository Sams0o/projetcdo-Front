import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';
import { DeleteExperienceComponent } from '../delete-experience/delete-experience.component';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userExperiences: Experience[] = []; // Stocker les experiences de l'utilisateur
  experienceSearch: Experience[] = [];
  searchInfos!: string;
  filteredCountries: Experience[] = [];

  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  @ViewChild(EditExperienceComponent) editModal!: EditExperienceComponent;
  @ViewChild(DeleteExperienceComponent)
  confirmationModal!: DeleteExperienceComponent;

  constructor(
    private router: Router,
    private userService: UserService,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.getDataUserProfil();
    this.experienceService.updateExperiences(this.userExperiences);
  }

  // Pour afficher le modal de création d'experience
  openCreateDialog() {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  }

  getDataUserProfil() {
    this.userService.getUserById().subscribe((data) => {
      this.user = data;
      this.userExperiences = data.experiences;
    });
    return this.userExperiences;
  }
  // Lien qui permet à l'utilisateur de modifier ses données personnelles
  settings() {
    this.router.navigate(['/profil/user-profile/settings']);
  }

  // Pour la déconnexion de l'utilisateur
  logout() {
    this.userService.logout();
  }

  // Pour ouvrir la modal de modification
  openEditDialog(experience: Experience) {
 
    if (this.editModal) {

      this.editModal.open(experience);
    }
    const dialog = document.getElementById(
      'editExperienceDialog'
    ) as HTMLDialogElement;
    dialog?.showModal();
  }

  // Gérer la MàJ de l'expérience utilisateur
  experienceUpdated(updatedExperience: Experience) {

    // trouver l'index de l'expérience qui a été MàJ
    const indexToUpdate = this.userExperiences.findIndex(
      (exp) => exp.id === updatedExperience.id
    );

    // Vérifer si l'experience existe
    if (indexToUpdate !== -1) {
      this.userExperiences[indexToUpdate] = updatedExperience;
      this.userExperiences = [...this.userExperiences];
      this.userExperiences = this.getDataUserProfil();
      // this.experienceService.updateExperiences(this.userExperiences);
    }
    this.userExperiences = this.getDataUserProfil();
    this.experienceService.updateExperiences(this.userExperiences);
  }

  openDeleteModal(experienceId: number) {
    this.confirmationModal.experienceId = experienceId;
    this.confirmationModal.open();
  }

  ExperienceDeleted(experienceId: number) {
    // Supprimer l'expérience de userExperiences
    this.userExperiences = this.userExperiences.filter(
      (exp) => exp.id !== experienceId
    );

    // Supprimer l'expérience de filteredCountries si elle y est présente
    if (this.filteredCountries.some((exp) => exp.id === experienceId)) {
      this.filteredCountries = this.filteredCountries.filter(
        (exp) => exp.id !== experienceId
      );
    }
  }

  onSearchCountries(searchInfos: string) {
    
    if (searchInfos) {
       this.filteredCountries = this.userExperiences.filter((exp) => {
         // Vérifier si "roadtrip" commence par la chaîne recherchée
         const isRoadtripSearch = 'roadtrip'.startsWith(searchInfos.toLowerCase());

         // Filtre pour "Roadtrip" ou pays spécifique
         return isRoadtripSearch && exp.countries.length > 1
           ? true
           : exp.countries.some((country) =>
               country.name.toLowerCase().includes(searchInfos.toLowerCase())
             );
       });
    } else {
      this.filteredCountries = [...this.userExperiences];
    }
  }
}
