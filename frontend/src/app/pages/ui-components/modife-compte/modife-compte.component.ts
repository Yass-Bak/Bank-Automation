import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte } from 'src/app/models/compte.model';
import { ClientService } from 'src/app/services/client.service';
import { CompteService } from 'src/app/services/compte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modife-compte',
  standalone: true,
  imports: [MatFormFieldModule,
          MatSelectModule,
          FormsModule,
          ReactiveFormsModule,
          CdkScrollable,
          MatButtonModule,
          MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule,CommonModule],
  templateUrl: './modife-compte.component.html',
  styleUrl: './modife-compte.component.css'
})
export class ModifeCompteComponent {
   compteForm!: FormGroup;
    clients: any[] = [];
    compteId: number; 
    compte: Compte ;


    constructor(
      private fb: FormBuilder,
      private compteService: CompteService,
      private clientService: ClientService,
      private router: Router,
       private route: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.compteId = Number(idParam);
      // Initialiser le formulaire
      this.compteForm = this.fb.group({
        rib:this.compteId,
        solde: [''],
        clientId: ['']
      });
      this.getCompte();
      // Charger la liste des clients
      this.clientService.getAllClients().subscribe((clients) => {
        this.clients = clients;
        console.log("clients",this.clients)
      });
    }
    getCompte(): void {
      this.compteService.getCompteById(this.compteId).subscribe(data => {
         this.compte = data;
         console.log("compte", this.compte);
         // Mettre à jour le formulaire avec les données du compte
         this.compteForm.patchValue({
            solde: this.compte.solde,
            clientId: this.compte.clientId
         });
      });
   }

    // Soumettre le formulaire pour ajouter un compte
    onSubmit(): void {
      if (this.compteForm.valid) {
        this.compteService.updateCompte(this.compteForm.value).subscribe({
          next: () => {
            
            Swal.fire("Compte ajouté avec succès!");
            this.router.navigate(['/ui-components/listsCompte']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du compte:', err);
            alert('Une erreur est survenue.');
          }
        });
      } else {
        alert('Veuillez remplir correctement le formulaire.');
      }
    }

}
