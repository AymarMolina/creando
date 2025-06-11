import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductId } from './product-id';

describe('ProductId', () => {
  let component: ProductId;
  let fixture: ComponentFixture<ProductId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
