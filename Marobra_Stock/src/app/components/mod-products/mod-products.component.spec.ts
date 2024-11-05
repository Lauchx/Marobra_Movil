import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModProductComponent } from './mod-products.component';

describe('ModProductsComponent', () => {
  let component: ModProductComponent;
  let fixture: ComponentFixture<ModProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
