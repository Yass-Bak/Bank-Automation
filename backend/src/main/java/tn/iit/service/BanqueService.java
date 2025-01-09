package tn.iit.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iit.entity.Banque;
import tn.iit.entity.Client;
import tn.iit.repository.BanqueRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BanqueService {

    @Autowired
    private BanqueRepository banqueRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Banque createBanque(String nom, String email, String password) {
        Banque banque = new Banque();
        banque.setNom(nom);
        banque.setEmail(email);

        String hashedPassword = passwordEncoder.encode(password);
        banque.setPassword(hashedPassword);

        return banqueRepository.save(banque);
    }

    public Optional<Banque> getBanqueByEmail(String email) {
        return banqueRepository.findByEmail(email);
    }

    public Optional<Banque> getBanqueById(Integer id) {
        return banqueRepository.findById(id);
    }

    public List<Banque> getAllBanques() {
        return banqueRepository.findAll();
    }

    public void deleteBanque(Integer id) {
        banqueRepository.deleteById(id);
    }

}
