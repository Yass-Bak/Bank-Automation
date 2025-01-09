export class Banque {
    id: number;
    nom: string;
    email: string;
    password: string;
  
    constructor(id: number, nom: string, email: string, password: string) {
      this.id = id;
      this.nom = nom;
      this.email = email;
      this.password = password;
    }
  }
  