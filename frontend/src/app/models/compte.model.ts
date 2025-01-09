export class Compte {
    rib: number;
    solde: number;
    clientId: number;
  
    constructor(rib: number, solde: number, clientId: number) {
      this.rib = rib;
      this.solde = solde;
      this.clientId = clientId;
    }
  }
  