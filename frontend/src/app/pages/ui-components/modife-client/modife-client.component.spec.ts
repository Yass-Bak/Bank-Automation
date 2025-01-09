import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifeClientComponent } from './modife-client.component';

describe('ModifeClientComponent', () => {
  let component: ModifeClientComponent;
  let fixture: ComponentFixture<ModifeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifeClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
