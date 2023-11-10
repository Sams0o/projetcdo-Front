import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Country } from 'src/app/models/country';
import { Experience } from 'src/app/models/experience';
import { CategoryService } from 'src/app/services/category.service';
import { CountryService } from 'src/app/services/country.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css'],
})
export class EditExperienceComponent {
  @Input() experience?: Experience; // accepte une expérience à modier
  @Output() experienceUpdated = new EventEmitter<Experience>(); // émet l'expérience MàJ
  // @Input() isOpen: boolean = false;

  isDialogOpen = false;

  editForm: FormGroup;
  countries: Country[] = [];
  categories: Category[] = [];

  successMessage: string | null = null; // Pour les messages de succès
  errorMessage: string | null = null; // Pour les messages d'erreur

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService, // pour gérer les requetes liées aux expériences
    private countryService: CountryService,
    private categoryService: CategoryService
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', Validators.required],
      city: ['', Validators.required],
      publication_date: [''],
      travel_date: ['', Validators.required],
      countries: [[]],
      categories: [[]],
    });
  }

  ngOnInit(): void {
    if (this.experience) {
      // Si une expérience est passée en input -> MàJ du formulaire avec ses données
      this.editForm.patchValue({
        // patchValue = pour MàJ uniquement les champs fournis
        title: this.experience.title,
        description: this.experience.description,
        city: this.experience.city,
        travel_date: this.experience.travel_date,
        countries: this.experience.countries.map((c) => c.id),
        categories: this.experience.categories.map((cat) => cat.id),
      });
    }

    this.loadCountries();
    this.loadCategories();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  open(experience: Experience) {
    console.log(
      "open() - Ouverture de EditExperienceComponent avec l'expérience:",
      experience
    );

    this.experience = experience;
    this.editForm.patchValue({
      title: experience.title,
      description: experience.description,
      city: experience.city,
      travel_date: experience.travel_date,
      countries: experience.countries.map((c) => c.id),
      categories: experience.categories.map((cat) => cat.id),
    });
    this.isDialogOpen = true;
    console.log('isdialogOpen:', this.isDialogOpen);

    // this.isOpen = true;
  }

  close() {
    // this.isDialogOpen = false;
    console.log('close:', this.isDialogOpen);

    const dialog = document.getElementById(
      'editExperienceDialog'
    ) as HTMLDialogElement;
    dialog?.close();

    // Réinitialiser les messages quand le dialogue est fermé
    this.successMessage = null;
    this.errorMessage = null;
    // this.isOpen = false;
  }

  // OnSubmit appelé lors de la soumission du formulaire
  onSubmit() {
    console.log('Vérification données extraites :', this.editForm.value);

    // Vérifie si le formulaire est valide + si une expérience a été passée en input
    if (this.editForm.valid && this.experience) {
      const formValue = this.editForm.value;

      const transformedCountries = formValue.countries.map((id: number) => ({
        id,
      }));
      const transformedCategories = formValue.categories.map((id: number) => ({
        id,
      }));

      const updatedExperience = {
        ...this.experience,
        title: formValue.title,
        description: formValue.description,
        city: formValue.city,
        travel_date: formValue.travel_date,
        countries: transformedCountries,
        categories: transformedCategories,
      };
      // Fait appel au service pour MàJ l'expérience et gère la réponse.
      this.experienceService.updateExperience(updatedExperience).subscribe({
        next: (experience) => {
          this.experienceUpdated.emit(experience);
          this.successMessage = "L'expérience a été mise à jour avec succès.";
          setTimeout(() => (this.successMessage = null), 3000);
          this.close();
        },
        error: (error) => {
          this.errorMessage = "Erreur lors de la mise à jour de l'expérience";
          setTimeout(() => (this.errorMessage = null), 3000);
        },
      });
    }
  }
}
