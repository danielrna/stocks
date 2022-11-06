import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectFormComponent} from './project-form.component';
import {of} from "rxjs";
import {Project} from "../../../../domain/model/Project";
import {DomainUser} from "../../../../domain/model/DomainUser";
import {ProjectService} from "../../../../domain/project.service";
import {AuthenticationService} from "../../../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let mockProjectService;
  let mockAuthenticationService;
  let mockActivatedRoute;
  let fixture: ComponentFixture<ProjectFormComponent>;

  let defaultUser = of(<DomainUser>{
    displayName: "Test user",
    email: "test@test.fr",
    emailVerified: true,
    firstName: "Daniel",
    lastName: "Tester",
    photoURL: "http://photourl.com",
    uid: "23123213-123123123-123123123-13213123123",
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectFormComponent],
      providers: [
        {
          provide: ProjectService, useValue: jasmine.createSpyObj('ProjectService', ['*']),
        },
        {
          provide: AuthenticationService, useValue: jasmine.createSpyObj('AuthenticationService', ['getCurrentUser']),
        },
        {
          provide: ActivatedRoute, useValue: {params: of([{id: 1}, {id: 2}, {id: 3}]),},
        },
        {
          provide: Router, useValue: jasmine.createSpyObj('Router', ['*']),
        }]
    }).compileComponents();
    mockProjectService = TestBed.get(ProjectService);
    mockAuthenticationService = TestBed.get(AuthenticationService);
    mockAuthenticationService.getCurrentUser.and.returnValue(defaultUser);
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save project service with project object when asked', () => {

    //g
    let project = <Project>{}
    // mockkProjectService.createOrUpdateProject.and.returnValue(new Observable());

    // mockkAuthenticationService.getCurrentUser.and.returnValue(defaultUser)
    //w
    //t
    // expect(mockkProjectService.createOrUpdateProject).toHaveBeenCalledWith(project);
  });
})
