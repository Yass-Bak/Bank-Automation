package tn.iit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.iit.entity.Banque;
import java.util.Optional;

public interface BanqueRepository extends JpaRepository<Banque, Integer> {
    Optional<Banque> findByEmail(String email);
}
