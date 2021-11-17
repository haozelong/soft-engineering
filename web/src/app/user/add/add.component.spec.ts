import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {AddModule} from './add.module';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {UserService} from '../../../service/user.service';
import {User} from '../../../entity/user';
import {getTestScheduler} from 'jasmine-marbles';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        AddModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as unknown as UserService;
    fixture.detectChanges();
  });

  it('should create', () => {
    userService.setCurrentLoginUser({ role: {weight: 3}} as User);
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
