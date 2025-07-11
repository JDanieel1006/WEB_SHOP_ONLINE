import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartComponent } from './store-cart.component';

describe('StoreCartComponent', () => {
  let component: StoreCartComponent;
  let fixture: ComponentFixture<StoreCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
