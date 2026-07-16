import { User } from '../shared/models/User.model';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;           // for API calls
  error: string | null;
  // global loaded flag for user/1
  userDataLoaded: boolean;
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  userDataLoaded: false
};
