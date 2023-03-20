import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishDetailComponent } from './wish-detail.component';

describe('WishDetailComponent', () => {
  let component: WishDetailComponent;
  let fixture: ComponentFixture<WishDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
