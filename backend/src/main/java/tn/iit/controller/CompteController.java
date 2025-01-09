package tn.iit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iit.dto.ComptesWithClientDto;
import tn.iit.entity.Compte;
import tn.iit.service.CompteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comptes")
public class CompteController {
    @Autowired
    private CompteService compteService;

    @PostMapping
    public ResponseEntity<Compte> createCompte(@RequestBody Compte compte) {
        Compte savedCompte = compteService.saveCompte(compte);
        return ResponseEntity.ok(savedCompte);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compte> getCompteById(@PathVariable Integer id) {
        return compteService.getCompteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping
    public ResponseEntity<List<ComptesWithClientDto>> getAllComptes() {
        List<ComptesWithClientDto> comptes = compteService.getAllComptesWithClients();
        return ResponseEntity.ok(comptes);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Compte>> getComptesByClientId(@PathVariable Integer clientId) {
        List<Compte> comptes = compteService.getComptesByClientId(clientId);
        return ResponseEntity.ok(comptes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable Integer id) {
        compteService.deleteCompte(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping
    public ResponseEntity<Optional<Compte>> updateCompte(@RequestBody Compte compte) {
        Optional<Compte> updatedCompte = compteService.updateCompte(compte);
        return ResponseEntity.ok(updatedCompte);
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getCompteCount() {
        long comptesCount = compteService.countComptes();
        return ResponseEntity.ok(comptesCount);
    }
}
