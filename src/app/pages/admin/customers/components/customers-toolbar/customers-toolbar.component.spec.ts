import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersToolbarComponent } from './customers-toolbar.component';

describe('CustomersToolbarComponent', () => {
  let component: CustomersToolbarComponent;
  let fixture: ComponentFixture<CustomersToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
