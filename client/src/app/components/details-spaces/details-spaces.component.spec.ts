import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSpacesComponent } from './details-spaces.component';

describe('DetailsSpacesComponent', () => {
  let component: DetailsSpacesComponent;
  let fixture: ComponentFixture<DetailsSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsSpacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
