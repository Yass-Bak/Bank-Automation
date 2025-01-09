package tn.iit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iit.entity.Client;
import tn.iit.service.ClientService;
import lombok.*;
import tn.iit.service.CompteService;

import java.util.List;

@RestController
@RequestMapping("/clients")

public class ClientController {
    @Autowired
    private ClientService clientService;

    @Autowired
    private CompteService compteService;

    @PostMapping("/create")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {

        Client savedClient = clientService.saveClient(client);

        return ResponseEntity.ok(savedClient);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody Client clientDetails) {
        return clientService.getClientById(id)
                .map(existingClient -> {
                    existingClient.setNom(clientDetails.getNom());
                    existingClient.setPrenom(clientDetails.getPrenom());
                    // Ajoutez d'autres champs à mettre à jour ici
                    Client updatedClient = clientService.saveClient(existingClient);
                    return ResponseEntity.ok(updatedClient);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        compteService.deleteCompteByClientId(id);
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getClientCount() {
        long clientCount = clientService.countClients();
        return ResponseEntity.ok(clientCount);
    }
}
