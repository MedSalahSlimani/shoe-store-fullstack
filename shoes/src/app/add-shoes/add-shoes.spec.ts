import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShoes } from './add-shoes';

describe('AddShoes', () => {
  let component: AddShoes;
  let fixture: ComponentFixture<AddShoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
