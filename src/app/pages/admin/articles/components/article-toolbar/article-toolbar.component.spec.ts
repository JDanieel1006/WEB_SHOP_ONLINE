import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleToolbarComponent } from './article-toolbar.component';

describe('ArticleToolbarComponent', () => {
  let component: ArticleToolbarComponent;
  let fixture: ComponentFixture<ArticleToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
