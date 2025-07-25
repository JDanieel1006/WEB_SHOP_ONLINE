import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreToolbarComponent } from './store-toolbar.component';

describe('StoreToolbarComponent', () => {
  let component: StoreToolbarComponent;
  let fixture: ComponentFixture<StoreToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
