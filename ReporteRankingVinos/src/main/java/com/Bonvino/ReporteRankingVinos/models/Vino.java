package com.Bonvino.ReporteRankingVinos.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Vino {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String nombre;
  private double precio;

  @OneToMany(mappedBy = "vino", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
  private List<Resenia> resenias;

  @OneToMany(mappedBy = "vino", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
  private List<Varietal> varietales;

  @ManyToOne
  @JoinColumn(name = "bodegaId", nullable = false)
  private Bodega bodega;

  public Vino(String nombre, double precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  public boolean tieneResenias() {
    return !this.resenias.isEmpty();
  }

  public float mostrarReseniasDeSommelierEnPeriodo(Date fechaDesde, Date fechaHasta) {
    List<Resenia> reseniasDeSommelierEnPeriodo= this.resenias.stream()
        .filter(resenia -> resenia.esDePeriodo(fechaDesde,  fechaHasta))
        .filter(Resenia::obtenerEsPremium)
        .toList();

    return calcularPromedioReseniasValidadas(reseniasDeSommelierEnPeriodo);
  }

  private float calcularPromedioReseniasValidadas(@org.jetbrains.annotations.NotNull List<Resenia> resenias) {
    return (float) resenias.stream().mapToDouble(Resenia::obtenerPuntaje).average().orElse(0);
  }
}