package tn.iit.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
@Table(name = "t_compte")
public class Compte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer rib;

    @Column(nullable = false)
    private float solde;

    @Column(name = "client_id", nullable = false)
    private Integer clientId;


}
