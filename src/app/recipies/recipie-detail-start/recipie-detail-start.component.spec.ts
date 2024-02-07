import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieDetailStartComponent } from './recipie-detail-start.component';

describe('RecipieDetailStartComponent', () => {
  let component: RecipieDetailStartComponent;
  let fixture: ComponentFixture<RecipieDetailStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipieDetailStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipieDetailStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
