import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalProduct } from './add-modal-product';

describe('AddModalProduct', () => {
  let component: AddModalProduct;
  let fixture: ComponentFixture<AddModalProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModalProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModalProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
