import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Country } from 'src/app/models/country';
import { Experience } from 'src/app/models/experience';
import { CategoryService } from 'src/app/services/category.service';
import { CountryService } from 'src/app/services/country.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.component.html',
  styleUrls: ['./create-experience.component.css'],
})
export class CreateExperienceComponent implements OnInit {
  experience!: Experience;
  createForm!: FormGroup;
  countries: Country[] = [];
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private countryService: CountryService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      publication_date: [''],
      travel_date: ['', Validators.required],
      countries: [[]],
      categories: [[]],
    });

    this.loadCountries();
    this.loadCategories();
  }

  open(experience: Experience) {
    console.log('Ouverture du modal de création d’expérience.');
    this.experience = experience;
    console.log('Expérience actuelle:', this.experience);

    this.createForm.patchValue({
      title: experience.title,
      description: experience.description,
      city: experience.city,
      travel_date: experience.travel_date,
      countries: experience.countries.map((c) => {
        return { id: c.id };
      }),
      categories: experience.categories.map((cat) => {
        return { id: cat.id };
      }),
    });
    console.log(
      'Valeurs du formulaire après patchValue:',
      this.createForm.value
    );
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

  onSubmit() {
    console.log('verif données extraites:', this.createForm.value);
    if (this.createForm.valid) {
      const formValue = this.createForm.value;

      const transformedCountries = formValue.countries.map((id: number) => ({
        id,
      }));
      const transformedCategories = formValue.categories.map((id: number) => ({
        id,
      }));

      const experienceData = {
        ...this.experience,
        title: formValue.title,
        description: formValue.description,
        city: formValue.city,
        travel_date: formValue.travel_date,
        countries: transformedCountries,
        categories: transformedCategories,
      };
      console.log('experiencedata', experienceData);

      this.experienceService.createExperience(experienceData).subscribe({
        next: (res) => {
          console.log('Experience envoyée : ', experienceData);
          alert("L'experience a été créee avec succés.");
          this.close();
          location.reload();
        },
        error: (error) => {
          console.error(
            "Une erreur est survenue lors de la création de l'expérience",
            error
          );
        },
      });
    }
  }

  close() {
    const dialog = document.querySelector('dialog');
    dialog?.close();
  }
}
