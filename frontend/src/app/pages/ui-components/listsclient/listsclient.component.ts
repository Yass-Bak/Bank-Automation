import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    DatePipe,
    MatIconModule,
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './listsclient.component.html',
  styleUrls: ['./listsclient.component.css']
})
export class AppListsComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'actions'];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  // Méthode pour récupérer tous les clients
  fetchClients(): void {
    this.isLoading = true; // Indicateur de chargement
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data; // Charger les clients
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des clients.';
        this.isLoading = false;
      }
    );
  }

  // Méthode pour naviguer vers la page d'ajout de client
  ajouterClient(): void {
    this.router.navigate(['/ui-components/ajoute-client']);
  }

  // Méthode pour naviguer vers la page de modification d'un client
  modifierClient(client: Client): void {
    this.router.navigate(['/ui-components/modife-client', client.id]);
  }
  supprimerClientAjax(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce client ?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
    try {
      this.clientService.deleteClientWithAjax(id);
      Swal.fire('Succès', 'Le compte a été supprimé avec succès.', 'success');
      this.isLoading = false;
      this.clients = this.clients.filter((c) => c.id !== id);
    } catch (error) {
      Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
    }}
  });}
  

  // Méthode pour supprimer un client avec confirmation
  supprimerClient(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce client ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true; // Indicateur de chargement pendant la suppression
        this.clientService.deleteClient(client.id).subscribe({
          next: () => {
            this.clients = this.clients.filter((c) => c.id !== client.id);
            
            Swal.fire("Client supprimé avec succès!");
            this.isLoading = false;
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la suppression du client.';
            this.isLoading = false;
          },
        });
      }
    });
  }
}
