import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modife-client',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollable,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './modife-client.component.html',
  styleUrls: ['./modife-client.component.css']
})
export class ModifeClientComponent implements OnInit {
  clientForm: FormGroup; // Formulaire pour le client.
  clientId!: number; // ID du client extrait de l'URL.

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router // Injection du Router
  ) {
    // Initialisation du formulaire.
    this.clientForm = this.fb.group({
      id: [''], // Champ ID.
      nom: [''], // Champ Nom.
      prenom: [''] // Champ Prénom.
    });
  }

  ngOnInit(): void {
    // Extraction de l'ID depuis l'URL.
    this.route.params.subscribe((params) => {
      this.clientId = +params['id']; // Convertit l'ID en nombre.
      this.loadClientData();
    });
  }

  // Charger les données du client à partir du service.
  loadClientData(): void {
    this.clientService.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.clientForm.patchValue(client); // Remplit le formulaire avec les données du client.
      },
      error: () => {
        alert('Erreur lors du chargement des données du client.');
      }
    });
  }

  // Méthode pour soumettre les modifications.
  onSubmit(): void {
    const updatedClient = this.clientForm.value;
    this.clientService.updateClient(this.clientId, updatedClient).subscribe({
      next: () => {
        Swal.fire("Client modifié avec succès!");
        this.router.navigate(['/ui-components/listsclient']); // Navigation après modification
      },
      error: () => alert('Erreur lors de la modification du client.')
    });
  }
}
