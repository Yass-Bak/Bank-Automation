import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Importez ApiService
import { Observable } from 'rxjs';
import { Compte } from '../models/compte.model';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private apiUrl = 'comptes'; // URL relative pour les clients, ApiService gère l'URL de base

  constructor(private apiService: ApiService) {}

  // Méthode pour créer un client
  createCompte(compte: Compte): Observable<Compte> {
    return this.apiService.request('post', `${this.apiUrl}`, compte);
  }
  updateCompte(compte: Compte): Observable<Compte> {
    return this.apiService.request('put', `${this.apiUrl}`, compte);
  }

  // Méthode pour obtenir un client par son ID
  getCompteByIdClient(id: number): Observable<Compte[]> {
    return this.apiService.request('get', `${this.apiUrl}/client/${id}`);
  }

  // Méthode pour obtenir tous les clients
  getAllComptes(): Observable<Compte[]> {
    return this.apiService.request('get', this.apiUrl);
  }
  getCompteById(id: number): Observable<Compte> {
    return this.apiService.request('get', `${this.apiUrl}/${id}`);
  }
  // Méthode pour supprimer un client
  deleteCompte(id: number): Observable<void> {
    return this.apiService.request('delete', `${this.apiUrl}/${id}`);
  }
  getCompteCount(): Observable<number> {
    return this.apiService.request('get',`${this.apiUrl}/count`);
    
  }
}
