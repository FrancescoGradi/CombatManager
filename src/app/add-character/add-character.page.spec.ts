import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCharacterPage } from './add-character.page';

describe('AddCharacterPage', () => {
  let component: AddCharacterPage;
  let fixture: ComponentFixture<AddCharacterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCharacterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
