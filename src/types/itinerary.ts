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

// New extended interfaces for detailed day information
export interface KeyPlace {
  name: string
  description: string
  timeSlot?: string
  importance: 'must-see' | 'recommended' | 'optional'
  options?: string[]
  trivia?: string[]
}

export interface TransportRoute {
  from: string
  to: string
  line: string
  duration: string
  cost?: string
  notes?: string
}

export interface Transport {
  overview: string
  routes: TransportRoute[]
}

export interface NearbyActivity {
  name: string
  description: string
  timeNeeded: string
  category: 'shopping' | 'sightseeing' | 'cultural' | 'nature' | 'entertainment'
  walkTime?: string
}

export interface Restaurant {
  name: string
  type: string
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  specialty: string
  walkTime?: string
  notes?: string
}

export interface PracticalInfo {
  bestTime?: string
  crowdLevel?: 'low' | 'medium' | 'high'
  duration?: string
  weather?: string
  tips?: string[]
}

export interface DayDetails {
  keyPlaces?: KeyPlace[]
  transport?: Transport
  trivia?: string[]
  nearbyActivities?: NearbyActivity[]
  restaurants?: Restaurant[]
  practicalInfo?: PracticalInfo
}

export interface DayOption {
  id: string
  label: string
  isDefault?: boolean
  status: DayStatus[]
  puntosClave: KeyPoint[]
  dayDetails?: DayDetails
}

export interface Day {
  titulo: string
  fecha: string
  status?: DayStatus[]
  puntosClave?: KeyPoint[]
  opciones?: DayOption[]
  dayDetails?: DayDetails
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
