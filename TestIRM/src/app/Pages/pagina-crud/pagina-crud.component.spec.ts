import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCrudComponent } from './pagina-crud.component';

describe('PaginaCrudComponent', () => {
  let component: PaginaCrudComponent;
  let fixture: ComponentFixture<PaginaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
