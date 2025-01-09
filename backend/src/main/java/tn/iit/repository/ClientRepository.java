package tn.iit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.iit.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Integer> {
}
