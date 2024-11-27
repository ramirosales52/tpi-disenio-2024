package com.Bonvino.ReporteRankingVinos.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class RegionVitivinicola {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String nombre;

  @ManyToOne
  @JoinColumn(name = "provinciaId", nullable = false)
  private Provincia provincia;

  public RegionVitivinicola(String nombre, Provincia provincia) {
    this.nombre = nombre;
    this.provincia = provincia;
  }

  public String getNombreProvinciaYPais() {
    return this.getNombre() + ", " + this.provincia.getNombreYPais();
  }

  public String getNombre() {
    return nombre;
  }
}
