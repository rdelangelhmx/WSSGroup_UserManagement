import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  // Load all
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users: users.map(u => ({ ...u, role: u.role || 'User' } as any)) // map DTO to User
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load by id (global)
  on(UserActions.loadUserById, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    selectedUser: { ...user, role: user.role || 'User' } as any,
    userDataLoaded: true   // set flag when user/1 loaded
  })),
  on(UserActions.loadUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    userDataLoaded: false
  })),

  // Create
  on(UserActions.createUser, (state) => ({ ...state, loading: true })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: [...state.users, { ...user, role: user.role || 'User' } as any]
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Update
  on(UserActions.updateUser, (state) => ({ ...state, loading: true })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: state.users.map(u => u.id === user.id ? { ...user, role: user.role || 'User' } as any : u),
    selectedUser: null
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Delete
  on(UserActions.deleteUser, (state) => ({ ...state, loading: true })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    users: state.users.filter(u => u.id !== id)
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Select for form
  on(UserActions.selectUser, (state, { id }) => ({
    ...state,
    selectedUser: state.users.find(u => u.id === id) || null
  })),
  on(UserActions.clearSelectedUser, (state) => ({ ...state, selectedUser: null }))
);
