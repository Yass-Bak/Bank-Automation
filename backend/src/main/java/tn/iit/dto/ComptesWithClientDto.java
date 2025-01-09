package tn.iit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ComptesWithClientDto {
    private float solde;
    private Integer rib;
    private String nomClient;
    private Integer clientId;
}
