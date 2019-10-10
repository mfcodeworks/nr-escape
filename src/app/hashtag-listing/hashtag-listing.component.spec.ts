import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagListingComponent } from './hashtag-listing.component';

describe('HashtagListingComponent', () => {
  let component: HashtagListingComponent;
  let fixture: ComponentFixture<HashtagListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
