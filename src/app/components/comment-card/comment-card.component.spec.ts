import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { SortPipe } from 'src/app/pipes/sort.pipe';

import { CommentCardComponent } from './comment-card.component';

describe('CommentCardComponent', () => {
  let component: CommentCardComponent;
  let fixture: ComponentFixture<CommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCardComponent,DateFormatPipe, SortPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expand', ()=>{
    component.toggleHeightLimit();
    expect(component.expand).toBeTrue();
    component.toggleHeightLimit();
    expect(component.expand).toBeFalse();
  })
});
