import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {EditModule} from './edit.module';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../entity/user';
import {UserService} from '../../../service/user.service';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let route: ActivatedRouteStub;
  let userService: UserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        EditModule,
        ApiTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as unknown as UserService;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    userService.setCurrentLoginUser({ role: {weight: 3}} as User)
    route.paramsSubject.next({id: '3'});
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
