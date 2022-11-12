import {provideMockActions} from '@ngrx/effects/testing';
import {EMPTY, Observable} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {cold, hot} from 'jasmine-marbles';
import {ProjectEffects} from "./project.effects";
import * as MyActions from '../actions/project.actions';
import {ProjectService} from "../../../domain/project.service";
import SpyObj = jasmine.SpyObj;


xdescribe('My Effects', () => {
  let effects: ProjectEffects;
  let actions: Observable<any>;
  let projectService: SpyObj<ProjectService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        {provide: ProjectService, useValue: projectService},
        ProjectEffects,
        provideMockActions(() => actions),
        // other providers
      ],
    });

  });

  it('should work', () => {
    const action = MyActions.getProjects({userId: "userId"});
    // const completion = MyActions.getProjectsSuccess(emp);
    effects = TestBed.inject(ProjectEffects);
    projectService = jasmine.createSpyObj(['getProjectsByOwnerId']);
    projectService.getProjectsByOwnerId.and.returnValue(EMPTY);
    // Refer to 'Writing Marble Tests' for details on '--a-' syntax
    actions = hot('--a-', {a: action});
    // const expected = cold('--b', {b: completion});

    // expect(effects.loadProjects).toBeObservable(expected);
  });
});
