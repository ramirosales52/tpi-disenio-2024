package com.Bonvino.ReporteRankingVinos.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
public class Pais {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Getter
  private  String nombre;

  private List<Provincia> provincias;

  public Pais(String nombre) {
    this.nombre = nombre;
  }
}
