package com.Bonvino.ReporteRankingVinos.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Pais {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Getter
  private String nombre;

  @OneToMany(mappedBy = "pais", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Provincia> provincias;

  public Pais(String nombre) {
    this.nombre = nombre;
  }

}
