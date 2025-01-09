import { ConfirmDialogComponent } from "src/app/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CompteService } from "src/app/services/compte.service";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { CommonModule, DatePipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MaterialModule } from "src/app/material.module";
import { Component, OnInit } from "@angular/core";
import { Compte } from "src/app/models/compte.model";
import { ClientService } from "src/app/services/client.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lists-compte',
  standalone: true,
  imports: [MatListModule, MatCardModule, DatePipe,RouterModule,CommonModule, MatIconModule, MatTableModule, MaterialModule],
  templateUrl: './listscompte.component.html',
  styleUrls: ['./listscompte.component.css']
})
export class AppListsCompteComponent implements OnInit {
  comptes: Compte[] = [];
  displayedColumns: string[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  clientId: number | null = null;
  clientName: string | null = null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private compteService: CompteService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.clientId = idParam ? Number(idParam) : null;
    this.updateDisplayedColumns();
    this.fetchComptes();
  }

  // Update displayed columns based on clientId
  updateDisplayedColumns(): void {
    this.displayedColumns = ['rib', 'solde', 'actions'];

    if (this.clientId == null) {
      this.displayedColumns.unshift('nomClient');
    } else {
      this.clientService
        .getClientById(this.clientId)
        .subscribe({
          next: (client) => {
            this.clientName = `${client.prenom} ${client.nom}`;
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la récupération des informations du client.';
          },
        });
    }
  }

  // Navigate to account creation page
  ajouterCompte(): void {
    this.router.navigate(['/ui-components/ajoute-compte']);
  }

  // Navigate to account edit page
  modifierCompte(compte: Compte): void {
    this.router.navigate([`/ui-components/modife-compte/${compte.rib}`]);
  }

  // Confirm and delete an account
  supprimerCompte(compte: Compte): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce compte ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.compteService.deleteCompte(compte.rib).subscribe({
          next: () => {
            this.comptes = this.comptes.filter((c) => c.rib !== compte.rib);
            this.isLoading = false;
            Swal.fire("Compte supprimé avec succès!");
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la suppression du compte.';
            this.isLoading = false;
          },
        });
      }
    });
  }

  // Fetch accounts from the service
  fetchComptes(): void {
    this.isLoading = true;
    const fetchObservable = this.clientId
      ? this.compteService.getCompteByIdClient(this.clientId)
      : this.compteService.getAllComptes();

    fetchObservable.subscribe({
      next: (data) => {
        this.comptes = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des comptes.';
        this.isLoading = false;
      },
    });
  }
}