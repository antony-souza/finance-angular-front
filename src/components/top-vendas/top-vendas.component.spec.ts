import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopVendasComponent } from './top-vendas.component';

describe('TopVendasComponent', () => {
  let component: TopVendasComponent;
  let fixture: ComponentFixture<TopVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopVendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
