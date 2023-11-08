import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-delete-experience',
  templateUrl: './delete-experience.component.html',
  styleUrls: ['./delete-experience.component.css'],
})
export class DeleteExperienceComponent {
  Experience!: Experience;
  isOpen = false;
  @Input() experienceId!: number;

  constructor(
    private experienceService: ExperienceService,
    private route: ActivatedRoute
  ) {}

  @Output() confirmEvent = new EventEmitter<number>();
  @Output() cancelEvent = new EventEmitter<void>();

  ngOnInit(): void {}

  deleteExperience(id: number) {
    this.experienceService.removeExperience(id).subscribe({
      next: (res) => {
        alert("L'expérience a été supprimée avec succès.");
        this.confirmEvent.emit(id);
        this.close();
      },
      error: (error) => {
        console.error(error);
        alert(
          "Une erreur s'est produite lors de la suppression de l'expérience."
        );
      },
    });
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  confirm() {
    this.deleteExperience(this.experienceId);
  }

  cancel() {
    this.cancelEvent.emit();
    this.close();
  }
}
