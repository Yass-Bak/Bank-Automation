import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifeCompteComponent } from './modife-compte.component';

describe('ModifeCompteComponent', () => {
  let component: ModifeCompteComponent;
  let fixture: ComponentFixture<ModifeCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifeCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
