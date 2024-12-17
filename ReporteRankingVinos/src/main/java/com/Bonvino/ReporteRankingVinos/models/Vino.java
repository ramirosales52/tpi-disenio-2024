package com.Bonvino.ReporteRankingVinos.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Vino {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String nombre;
  private double precio;

  @OneToMany(mappedBy = "vino", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
  private List<Resenia> resenias;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "vino_varietal", joinColumns = @JoinColumn(name = "vinoId"), inverseJoinColumns = @JoinColumn(name = "varietalId"))
  private List<Varietal> varietales;

  @ManyToOne
  @JoinColumn(name = "bodegaId", nullable = false)
  private Bodega bodega;

  public Vino(String nombre, double precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  public double getCalificacionGeneral() {
    return this.resenias.stream().mapToInt(Resenia::obtenerPuntaje).average().orElse(0.0);
  }

  public boolean tieneResenias() {
    return !this.resenias.isEmpty();
  }

  public String obtenerInformacionVinoBodegaYVarietal() {
    return this.getNombre() + " - " + String.valueOf(this.getPrecio()) + " - "
        + String.format("%.2f", this.getCalificacionGeneral()) + " - "
        + this.bodega.obtenerNombreRegionProvinciaYPais() + " - "
        + this.varietales.stream().map(Varietal::getNombre).toList();
  }
}