import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, state => state.users);
export const selectSelectedUser = createSelector(selectUserState, state => state.selectedUser);
export const selectLoading = createSelector(selectUserState, state => state.loading);
export const selectError = createSelector(selectUserState, state => state.error);
export const selectUserDataLoaded = createSelector(selectUserState, state => state.userDataLoaded);
