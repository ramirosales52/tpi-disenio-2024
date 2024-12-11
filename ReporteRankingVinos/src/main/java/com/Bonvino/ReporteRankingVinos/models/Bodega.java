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
public class Bodega {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String nombre;

  @ManyToOne
  @JoinColumn(name = "regionId", nullable = false)
  private RegionVitivinicola region;

  public String obtenerNombreRegionProvinciaYPais() {
    return this.getNombre() + ", " + this.region.getNombreProvinciaYPais();
  }

  public Bodega(String nombre, RegionVitivinicola region) {
    this.nombre = nombre;
    this.region = region;
  }
}
