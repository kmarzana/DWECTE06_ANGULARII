import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoComponent } from './neo.component';

describe('NeoComponent', () => {
  let component: NeoComponent;
  let fixture: ComponentFixture<NeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
