package tn.iit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iit.dto.ComptesWithClientDto;
import tn.iit.entity.Compte;
import tn.iit.repository.ClientRepository;
import tn.iit.repository.CompteRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompteService {
    private final CompteRepository compteRepository;

    @Autowired
    private ClientRepository clientRepository;

    public CompteService(CompteRepository compteRepository) {
        this.compteRepository = compteRepository;
    }

    public Compte saveCompte(Compte compte) {
        return compteRepository.save(compte);
    }

    public Optional<Compte> getCompteById(Integer id) {
        return compteRepository.findById(id);
    }

    public List<Compte> getComptesByClientId(Integer clientId) {
        return compteRepository.findByClientId(clientId);
    }

    public void deleteCompte(Integer id) {
        compteRepository.deleteById(id);
    }

    public List<Compte> getAllComptes(){return compteRepository.findAll();}

    public Optional<Compte> updateCompte( Compte compte) {

        Optional<Compte> existingCompteOptional = compteRepository.findById(compte.getRib());

        if (existingCompteOptional.isPresent()) {

            Compte existingCompte = existingCompteOptional.get();


            existingCompte.setSolde(compte.getSolde());  // Exemple de mise à jour
            existingCompte.setClientId(compte.getClientId());

            return Optional.of(compteRepository.save(existingCompte));
        } else {

            return Optional.empty();
        }
    }
    public void deleteCompteByClientId(Integer clientId) {
        try {
            List<Compte> banques = compteRepository.findByClientId(clientId);
            if (banques != null && !banques.isEmpty()) {
                compteRepository.deleteAll(banques);
            }
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la suppression des comptes pour clientId: " + clientId, e);
        }
    }
    public List<ComptesWithClientDto> getAllComptesWithClients() {
        List<Compte> comptes = compteRepository.findAll();

        return comptes.stream().map(compte -> {
            ComptesWithClientDto dto = new ComptesWithClientDto();
            dto.setRib(compte.getRib());
            dto.setSolde(compte.getSolde());


            clientRepository.findById(compte.getClientId()).ifPresent(client -> {
                dto.setClientId(client.getId());
                dto.setNomClient(client.getPrenom()+" " +client.getNom());
            });

            return dto;
        }).collect(Collectors.toList());
    }
    public long countComptes() {
        return compteRepository.count();
    }
}
