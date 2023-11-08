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
  @Input() isOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private countryService: CountryService,
    private categoryService: CategoryService
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      publication_date: [''],
      travel_date: ['', Validators.required],
      countries: [[]],
      categories: [[]],
    });
  }
  ngOnInit(): void {
    this.loadCountries();
    this.loadCategories();
  }

  open(experience: Experience) {
    this.experience = experience;

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
    this.isOpen = true;
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
      this.experienceService.createExperience(experienceData).subscribe({
        next: (res) => {
          this.close();
          console.log('Experience envoyée : ', experienceData);
          alert("L'experience a été créee avec succés.");
          location.reload();
        },
        error: (error) => {
          console.error(
            "Une erreur est survenue lors de la création de l'expérience",
            error);
        },
      });
    }
  }

  close() {
    this.isOpen = false;
  }
}
