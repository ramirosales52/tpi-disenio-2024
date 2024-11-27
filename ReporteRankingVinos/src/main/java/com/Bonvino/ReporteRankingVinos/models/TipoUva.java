package com.Bonvino.ReporteRankingVinos.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
public class TipoUva {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String nombre;

  public TipoUva(String nombre) {
    this.nombre = nombre;
  }

  public String getNombre() {
    return this.nombre;
  }
}
