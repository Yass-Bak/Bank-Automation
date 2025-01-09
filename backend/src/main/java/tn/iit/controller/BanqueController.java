package tn.iit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.iit.entity.Banque;
import tn.iit.service.BanqueService;

@RestController
@RequestMapping("/banque")
public class BanqueController {

    @Autowired
    private BanqueService banqueService;

    @PostMapping("/create")
    public Banque createBanque(@RequestBody Banque banque) {
        return banqueService.createBanque(banque.getNom(), banque.getEmail(), banque.getPassword());
    }
}

