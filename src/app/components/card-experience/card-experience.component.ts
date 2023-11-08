import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.css'],
})
export class CardExperienceComponent {
  @Input() allExperiences: Experience[] = [];
  @Input() enableEdit: boolean = false;
  @Output() editRequest = new EventEmitter<Experience>();
  @Output() deleteRequest = new EventEmitter<number>();

  constructor() {}

  editExperience(experience: Experience) {
    this.editRequest.emit(experience);
  }

  onDelete(experienceId: number | undefined) {
    // console.log("info:", typeof experienceId);
    
    this.deleteRequest.emit(experienceId);
  }

}
