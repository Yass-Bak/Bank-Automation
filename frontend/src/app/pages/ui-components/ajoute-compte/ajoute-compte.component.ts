import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { CompteService } from 'src/app/services/compte.service';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoute-compte',
  standalone: true,
  imports: [MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CdkScrollable,
        MatButtonModule,
        MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule,CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,],
  templateUrl: './ajoute-compte.component.html',
  styleUrl: './ajoute-compte.component.css'
})
export class AjouteCompteComponent {
  compteForm!: FormGroup;
  clients: any[] = [];
  filteredClients$!: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private compteService: CompteService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec validations
    this.compteForm = this.fb.group({

      solde: [''],
      clientId: ['']
    });
  
    
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
  
      this.filteredClients$ = this.compteForm.get('clientId')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterClients(value))
      );
    });
  }
  
  private _filterClients(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter((client) =>
      `${client.nom} ${client.prenom}`.toLowerCase().includes(filterValue)
    );
  }
  
  onSubmit(): void {
    if (this.compteForm.valid) {
      this.compteService.createCompte(this.compteForm.value).subscribe({
        next: () => {
           Swal.fire("Compte ajouté avec succès!", "success");
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
  displayClient(clientId: any): string {
    if (!clientId) return '';
    const client = this.clients.find((c) => c.id === clientId);
    return client ? `${client.nom} ${client.prenom}` : '';
  }
}
