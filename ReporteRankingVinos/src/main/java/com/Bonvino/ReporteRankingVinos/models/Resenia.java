package com.Bonvino.ReporteRankingVinos.models;

import java.util.Date;

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
public class Resenia {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private boolean esPremium;
  private Integer puntaje;
  private Date fechaResenia;

  @ManyToOne
  @JoinColumn(name = "vino_id", nullable = false)
  private Vino vino;

  public Resenia(boolean esPremium, Integer puntaje, Date fechaResenia) {
    this.esPremium = esPremium;
    this.puntaje = puntaje;
    this.fechaResenia = fechaResenia;
  }

  public Integer obtenerPuntaje() {
    return this.puntaje;
  }

  public boolean sosDeSommelier() {
    return this.esPremium;
  }

  public boolean esDePeriodo(Date fechaDesde, Date fechaHasta) {
    return this.fechaResenia.after(fechaDesde) && this.fechaResenia.before(fechaHasta);
  }

  public Date getFechaResenia() {
    return this.fechaResenia;
  }
}
