import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../shared/dtos/UserDTO';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ users: UserDTO[] }> {
    return this.http.get<{ users: UserDTO[] }>(this.baseUrl);
  }

  getById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/${id}`);
  }

  create(user: Partial<UserDTO>): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.baseUrl}/add`, user);
  }

  update(id: number, user: Partial<UserDTO>): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
