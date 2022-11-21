import {createAction, props} from '@ngrx/store';
import {DomainUser} from "../../../domain/model/DomainUser";

export const getCurrentUser = createAction('[User] Get Current User')
export const getCurrentUserUSuccess = createAction('[User] Get Current User Success', props<{ user: DomainUser }>())
export const disconnectCurrentUser = createAction('[User] Disconnect Current User')
export const disconnectCurrentUserSuccess = createAction('[User] Disconnect Current User Success')

