import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteCompteComponent } from './ajoute-compte.component';

describe('AjouteCompteComponent', () => {
  let component: AjouteCompteComponent;
  let fixture: ComponentFixture<AjouteCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouteCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
