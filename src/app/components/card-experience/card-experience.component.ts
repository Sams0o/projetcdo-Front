import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.css'],
})
export class CardExperienceComponent implements OnInit {
  test!: Experience[];
  @Input() allExperiences!: Experience[];
  @Input() enableEdit: boolean = false;
  @Output() editRequest = new EventEmitter<Experience>();
  @Output() deleteRequest = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      console.log('coucou', this.allExperiences);
      this.test = [...this.allExperiences];
      console.log('exp oninit', this.allExperiences);
      console.log('test oninit', this.test);
    }, 300);
  }

  editExperience(experience: Experience) {
    this.editRequest.emit(experience);
    setTimeout(() => {
      this.test = [...this.allExperiences];
    }, 4000);
    console.log('exp edit', this.allExperiences);
    console.log('test edit', this.test);
  }

  onDelete(experienceId: number | undefined) {
    this.deleteRequest.emit(experienceId);
  }
}
