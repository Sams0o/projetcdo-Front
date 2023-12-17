import { TestBed } from '@angular/core/testing';

import { ExperienceReloadService } from './experience-reload.service';

describe('ExperienceReloadService', () => {
  let service: ExperienceReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienceReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
