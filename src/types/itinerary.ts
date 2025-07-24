// src/types/itinerary.ts

export interface ActivityAlternative {
  titulo: string
  descripcion: string
}

export interface KeyPoint {
  icono: string
  titulo: string
  descripcion: string
  alternativas?: ActivityAlternative[]
}

export interface DayStatus {
  clase: string
  texto: string
}

export interface DayOption {
  id: string
  label: string
  isDefault?: boolean
  status: DayStatus[]
  puntosClave: KeyPoint[]
}

export interface Day {
  titulo: string
  fecha: string
  status?: DayStatus[]
  puntosClave?: KeyPoint[]
  opciones?: DayOption[]
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
