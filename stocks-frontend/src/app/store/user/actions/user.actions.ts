import {createAction, props} from '@ngrx/store';
import {Project} from "../../../domain/model/Project";
import {DomainUser} from "../../../domain/model/DomainUser";

export const getCurrentUser = createAction('[User] Get Current User')
export const getCurrentUserUSuccess = createAction('[User] Get Current User Success', props<{ user: DomainUser }>())
