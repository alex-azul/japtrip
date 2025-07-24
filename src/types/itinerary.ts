// src/types/itinerary.ts

export interface KeyPoint {
  icono: string
  titulo: string
  descripcion: string
}

export interface DayStatus {
  clase: string
  texto: string
}

export interface Day {
  titulo: string
  fecha: string
  status: DayStatus[]
  puntosClave: KeyPoint[]
}

export interface City {
  id: string
  nombre: string
  colorBorde: string
  dias: Day[]
}

export interface Itinerary {
  tituloViaje: string
  subtituloViaje: string
  ciudades: City[]
}
