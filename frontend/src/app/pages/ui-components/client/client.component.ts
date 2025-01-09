import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientService } from 'src/app/services/client.service';
import { CommonModule } from '@angular/common';
import { Client } from 'src/app/models/client.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tooltips',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollable,
    MatButtonModule,
    MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './ajoute-client.component.css'
})
export class AppClientComponent {
  clientForm: FormGroup; // Define the form group
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialiser le formulaire avec des validations
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]], // Nom obligatoire, min 2 caractères
      prenom: ['', [Validators.required, Validators.minLength(2)]], // Prénom obligatoire, min 2 caractères
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.clientForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    this.isLoading = true; // Show loading state
    const client: Client = this.clientForm.value; // Get form values

    // Call the service to create the client
    this.clientService.createClient(client).subscribe(
      (newClient) => {
        this.isLoading = false;
        this.successMessage = 'Client ajouté avec succès!';
         Swal.fire("Client ajouté avec succès!");
        this.router.navigate(['/ui-components/listsclient']); // Redirect to client list after success
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la création du client. Veuillez réessayer.';
      }
    );
  }
}