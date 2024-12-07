import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbillingComponent } from './productbilling.component';

describe('ProductbillingComponent', () => {
  let component: ProductbillingComponent;
  let fixture: ComponentFixture<ProductbillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductbillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
