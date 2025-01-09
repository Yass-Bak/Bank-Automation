import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Importez ApiService
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private apiService: ApiService) {}

    login(credentials: { email: string, password: string }): Observable<any> {
        
        return this.apiService.request('post', 'auth/login', credentials);
    }
    isAuthenticated(): boolean {
        const token = localStorage.getItem('auth_token');
        return token !== null && token !== '';
      }
   
    setAuthToken(token: string): void {
        window.localStorage.setItem("auth_token", token);
    }

    
    getAuthToken(): string | null {
        return window.localStorage.getItem("auth_token");
    }

    
    logout(): void {
        window.localStorage.removeItem("auth_token");
    }
}