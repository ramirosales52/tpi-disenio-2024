package com.Bonvino.ReporteRankingVinos.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Provincia {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String nombre;

  @OneToMany(mappedBy = "provincia", cascade = CascadeType.ALL, orphanRemoval = false)
  private List<RegionVitivinicola> regionesVitivinicolas;

  @ManyToOne
  @JoinColumn(name = "paisId", nullable = false)
  private Pais pais;

  public Provincia(String nombre) {
    this.nombre = nombre;
  }

  public String getNombreYPais() {
    return this.getNombre() + ", " + this.pais.getNombre();
  }

  public String getNombre() {
    return this.nombre;
  }
}
