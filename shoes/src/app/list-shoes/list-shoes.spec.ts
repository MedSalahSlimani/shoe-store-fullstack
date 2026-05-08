import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShoes } from './list-shoes';

describe('ListShoes', () => {
  let component: ListShoes;
  let fixture: ComponentFixture<ListShoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListShoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
