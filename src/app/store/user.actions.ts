import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../shared/dtos/UserDTO';

// Load all
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: UserDTO[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());

// Load single (for global check)
export const loadUserById = createAction('[User] Load User By Id', props<{ id: number }>());
export const loadUserByIdSuccess = createAction('[User] Load User By Id Success', props<{ user: UserDTO }>());
export const loadUserByIdFailure = createAction('[User] Load User By Id Failure', props<{ error: string }>());

// Create
export const createUser = createAction('[User] Create User', props<{ user: Partial<UserDTO> }>());
export const createUserSuccess = createAction('[User] Create User Success', props<{ user: UserDTO }>());
export const createUserFailure = createAction('[User] Create User Failure', props<{ error: string }>());

// Update
export const updateUser = createAction('[User] Update User', props<{ id: number; user: Partial<UserDTO> }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: UserDTO }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: string }>());

// Delete
export const deleteUser = createAction('[User] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());

// Set selected user (for form)
export const selectUser = createAction('[User] Select User', props<{ id: number }>());
export const clearSelectedUser = createAction('[User] Clear Selected User');
