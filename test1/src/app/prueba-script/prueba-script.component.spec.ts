import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaScriptComponent } from './prueba-script.component';

describe('PruebaScriptComponent', () => {
  let component: PruebaScriptComponent;
  let fixture: ComponentFixture<PruebaScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
