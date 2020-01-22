import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCharacterPage } from './edit-character.page';

describe('EditCharacterPage', () => {
  let component: EditCharacterPage;
  let fixture: ComponentFixture<EditCharacterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCharacterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
