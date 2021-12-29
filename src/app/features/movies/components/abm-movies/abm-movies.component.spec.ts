import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMoviesComponent } from './abm-movies.component';

describe('AbmMoviesComponent', () => {
  let component: AbmMoviesComponent;
  let fixture: ComponentFixture<AbmMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
