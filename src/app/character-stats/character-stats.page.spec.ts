import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharacterStatsPage } from './character-stats.page';

describe('CharacterStatsPage', () => {
  let component: CharacterStatsPage;
  let fixture: ComponentFixture<CharacterStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
