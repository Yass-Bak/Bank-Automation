package tn.iit.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
@Table(name = "t_banque")
public class Banque implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer id;
    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    @Size(min = 6, message = "Le mot de passe doit comporter au moins 6 caractères.")
    private String password;

}
