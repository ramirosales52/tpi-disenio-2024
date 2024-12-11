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
public class Varietal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String nombre;

  @ManyToOne
  @JoinColumn(name = "tipoUvaId", nullable = false)
  private TipoUva tipoUva;

  public Varietal(String nombre, TipoUva tipoUva) {
    this.nombre = nombre;
    this.tipoUva = tipoUva;
  }

  public String getNombre() {
    return this.nombre;
  }

  public String obtenerNombreYTipoUva() {
    return this.getNombre() + " - " + this.tipoUva.getNombre();
  }
}
