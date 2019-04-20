import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupSearchFormComponent } from './chat-group-search-form.component';

describe('ChatGroupSearchFormComponent', () => {
  let component: ChatGroupSearchFormComponent;
  let fixture: ComponentFixture<ChatGroupSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
