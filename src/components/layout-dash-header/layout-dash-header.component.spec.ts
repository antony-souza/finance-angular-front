import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDashHeaderComponent } from './layout-dash-header.component';

describe('LayoutDashHeaderComponent', () => {
  let component: LayoutDashHeaderComponent;
  let fixture: ComponentFixture<LayoutDashHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDashHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutDashHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
