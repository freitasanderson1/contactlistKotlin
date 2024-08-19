import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactModalDeleteComponent } from './contact-modal-delete.component';

describe('ContactModalDeleteComponent', () => {
  let component: ContactModalDeleteComponent;
  let fixture: ComponentFixture<ContactModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactModalDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
