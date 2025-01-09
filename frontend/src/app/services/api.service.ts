import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

       request(method: string, url: string, data?: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
        });

        const fullUrl = `${this.baseUrl}/${url}`;

        switch (method.toLowerCase()) {
            case 'get':
                return this.http.get(fullUrl, { headers, withCredentials: true });
            case 'post':
                return this.http.post(fullUrl, data, { headers, withCredentials: true });
            case 'put':
                return this.http.put(fullUrl, data, { headers, withCredentials: true });
            case 'delete':
                return this.http.delete(fullUrl, { headers,withCredentials: true });
            default:
                throw new Error(`Méthode HTTP non supportée: ${method}`);
        }
    }

  
    getAuthToken(): string | null {
        return window.localStorage.getItem("auth_token");
    }
}