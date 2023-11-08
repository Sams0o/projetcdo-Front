import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { User } from 'src/app/models/user.model';
import { ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/user.service';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';
import { DeleteExperienceComponent } from '../delete-experience/delete-experience.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userExperiences: Experience[] = []; // Stocker les experiences de l'utilisateur
  experienceToDelete!: number;

  isModalOpen: boolean = false;

  @ViewChild(EditExperienceComponent) editModal!: EditExperienceComponent;
  @ViewChild(DeleteExperienceComponent)
  confirmationModal!: DeleteExperienceComponent;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getDataUserProfil();
    // console.log('avant le click', this.isModalOpen);
  }

  // Pour afficher le modal de création d'experience
  openModal() {
    this.isModalOpen = true;
    console.log('apres le click', this.isModalOpen);
  }

  getDataUserProfil() {
    this.userService.getUserById().subscribe((data) => {
      this.user = data;
      this.userExperiences = data.experiences;
      // console.log('Données de l\'utilisateur recupérées:', this.user);
    });
  }
  // Lien qui permet à l'utilisateur de modifier ses données personnelles
  settings() {
    this.router.navigate(['/profil/user-profile/settings']);
  }

  // Pour la déconnexion de l'utilisateur
  logout() {
    this.userService.logout();
  }

  openEditModal(experience: Experience) {
    console.log("Ouverture du modal avec l'experience:", experience);

    if (this.editModal) {
      this.editModal.open(experience);
    }
  }

  // Gérer la MàJ de l'expérience utilisateur
  ExperienceUpdated(updatedExperience: Experience) {
    console.log('correct + MàJ array:', updatedExperience);

    // trouver l'index de l'expérience qui a été MàJ
    const indexToUpdate = this.userExperiences.findIndex(
      (exp) => exp.id === updatedExperience.id
    );

    // Vérifer si l'experience existe
    if (indexToUpdate !== -1) {
      this.userExperiences[indexToUpdate] = updatedExperience;
      this.userExperiences = [...this.userExperiences];
    }
  }

  openDeleteModal(experienceId: number) {
    this.confirmationModal.experienceId = experienceId;
    this.confirmationModal.open();
    this.ExperienceDeleted(experienceId);
  }

  ExperienceDeleted(experienceId: number) {
    console.log('change:', typeof experienceId);
    // Supprimer l'expérience de userExperiences
    this.experienceToDelete = experienceId;
    this.userExperiences = this.userExperiences.filter(
      (exp) => exp.id !== experienceId
    );
  }
}
