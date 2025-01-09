import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Importez ApiService
import { Observable } from 'rxjs';
import { Client } from '../models/client.model'; // Modèle Client
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'clients'; // URL relative pour les clients, ApiService gère l'URL de base

  constructor(private apiService: ApiService) {}

  // Méthode pour créer un client
  createClient(client: Client): Observable<Client> {
    return this.apiService.request('post', `${this.apiUrl}/create`, client);
  }

  // Méthode pour obtenir un client par son ID
  getClientById(id: number): Observable<Client> {
    return this.apiService.request('get', `${this.apiUrl}/${id}`);
  }

  // Méthode pour obtenir tous les clients
  getAllClients(): Observable<Client[]> {
    return this.apiService.request('get', this.apiUrl);
  }
  updateClient(id: number, client: any): Observable<any> {
    return this.apiService.request('put',`${this.apiUrl}/update/${id}`, client);
  }
  // Méthode pour supprimer un client
  deleteClient(id: number): Observable<void> {
    return this.apiService.request('delete', `${this.apiUrl}/${id}`);
  }
  deleteClientWithAjax(id: number): void {
    const token = localStorage.getItem('auth_token');
    $.ajax({
      url: `http://localhost:8080/clients/${id}`,
      type: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
      success: () => {
        console.log('Client deleted successfully.');
      },
      error: () => {
        console.error('Error deleting client.');
      },
    });
  }
  getClientCount(): Observable<number> {
    return this.apiService.request('get',`${this.apiUrl}/count`);
    
  }
}
