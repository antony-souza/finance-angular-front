import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevoveryComponent } from './revovery.component';

describe('RevoveryComponent', () => {
  let component: RevoveryComponent;
  let fixture: ComponentFixture<RevoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevoveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
