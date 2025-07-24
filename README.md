# My Trip Guide - Guía de Viaje Interactiva

Una aplicación web desarrollada en Vue 3 para mostrar itinerarios de viaje de forma interactiva y visualmente atractiva. Incluye soporte para opciones de días múltiples y alternativas de actividades.

## 🚀 Características

- **Interfaz interactiva** con Vue 3 y Composition API
- **Opciones de días múltiples** (ej: Día 4A vs Día 4B)
- **Alternativas de actividades** dentro de cada día
- **Páginas de detalles extendidas** para cada día con información completa
- **Información de transporte** detallada con rutas, horarios y costos
- **Restaurantes recomendados** con precios y especialidades
- **Actividades adicionales** categorizadas por tipo
- **Datos curiosos y trivia** para enriquecer la experiencia
- **Diseño responsive** optimizado para móviles
- **Persistencia de selecciones** con localStorage
- **Gestión de estado** con Pinia
- **TypeScript** para mayor robustez del código

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── DayCard.vue            # Componente principal de tarjetas de día (clickeable)
│   ├── CitySection.vue        # Sección de cada ciudad
│   ├── AppHeader.vue          # Cabecera de la aplicación
│   ├── KeyPlacesSection.vue   # Sección de lugares clave detallados
│   ├── TransportSection.vue   # Información de transporte detallada
│   ├── RestaurantsSection.vue # Restaurantes recomendados
│   ├── NearbyActivitiesSection.vue # Actividades adicionales
│   └── TriviaSection.vue      # Datos curiosos y trivia
├── stores/
│   └── itinerary.ts           # Store de Pinia para gestión de estado
├── types/
│   └── itinerary.ts           # Interfaces TypeScript (extendidas)
├── router/
│   └── index.ts               # Configuración de rutas Vue Router
└── views/
    ├── ItineraryView.vue      # Vista principal del itinerario
    └── DayDetailView.vue      # Vista detallada de cada día

public/
└── itinerario.json            # Datos del itinerario (con soporte extendido)
```

## 📋 Formato del JSON

El archivo `itinerario.json` soporta múltiples formatos para mayor flexibilidad:

### Estructura Base

```json
{
  "tituloViaje": "Título del Viaje",
  "subtituloViaje": "Subtítulo descriptivo",
  "ciudades": [
    {
      "id": "ciudad-id",
      "nombre": "Nombre de la Ciudad",
      "colorBorde": "#HEX_COLOR",
      "dias": [
        // Ver formatos de días a continuación
      ]
    }
  ]
}
```

### Formato de Días

#### 1. Día Simple (formato tradicional)

```json
{
  "titulo": "Día 1: Título del Día",
  "fecha": "28 Nov",
  "status": [
    { "texto": "Fijo", "clase": "status-fijo" }
  ],
  "puntosClave": [
    {
      "icono": "🏮",
      "titulo": "Actividad Principal",
      "descripcion": "Descripción de la actividad"
    }
  ]
}
```

#### 2. Día con Opciones Múltiples

```json
{
  "titulo": "Día 4: Relax y Vanguardia",
  "fecha": "2 Dic",
  "opciones": [
    {
      "id": "4a",
      "label": "4A: Arte y Rascacielos",
      "isDefault": true,
      "status": [{ "texto": "Elección en grupo", "clase": "status-eleccion" }],
      "puntosClave": [
        {
          "icono": "🎨",
          "titulo": "Roppongi Hills",
          "descripcion": "Tarde dedicada al arte"
        }
      ]
    },
    {
      "id": "4b",
      "label": "4B: Tecnología y Futuro",
      "status": [{ "texto": "Elección en grupo", "clase": "status-eleccion" }],
      "puntosClave": [
        {
          "icono": "🤖",
          "titulo": "Odaiba - Gundam Base",
          "descripcion": "Visita al Gundam gigante"
        }
      ]
    }
  ]
}
```

#### 3. Actividades con Alternativas

```json
{
  "icono": "🌙",
  "titulo": "Tarde Flexible en Kioto",
  "descripcion": "Regreso a Kioto con múltiples opciones",
  "alternativas": [
    {
      "titulo": "Iluminaciones Hanatōro",
      "descripcion": "Paseo nocturno por templos iluminados"
    },
    {
      "titulo": "Cata de Sake en Fushimi",
      "descripcion": "Visita a destilerías con degustación"
    },
    {
      "titulo": "Compras en Kyoto Station",
      "descripcion": "Shopping en el complejo de la estación"
    }
  ]
}
```

## 🔍 Formato Extendido para Detalles de Día

Para crear páginas de detalles completas, puedes añadir un objeto `dayDetails` a cualquier día u opción de día:

### Estructura de `dayDetails`

```json
{
  "dayDetails": {
    "keyPlaces": [
      {
        "name": "Sensō-ji Temple",
        "description": "El templo más antiguo de Tokio, fundado en el año 628 DC...",
        "timeSlot": "9:00-11:00",
        "importance": "must-see",
        "options": ["Visita matutina temprana", "Iluminación nocturna"],
        "trivia": ["Sobrevivió a los bombardeos de la Segunda Guerra Mundial", "Recibe más de 30 millones de visitantes al año"]
      }
    ],
    "transport": {
      "overview": "Principalmente metro y caminata",
      "routes": [
        {
          "from": "Hotel Shibuya",
          "to": "Sensō-ji Temple",
          "line": "Ginza Line",
          "duration": "20 min",
          "cost": "200¥",
          "notes": "Salir en Asakusa Station, salida 1"
        }
      ]
    },
    "trivia": [
      "El templo fue fundado en el año 628 DC",
      "La calle Nakamise tiene más de 300 años de antigüedad",
      "El barrio de Asakusa era el centro de entretenimiento durante el período Edo"
    ],
    "nearbyActivities": [
      {
        "name": "Nakamise Shopping Street",
        "description": "Calle tradicional con puestos de snacks y souvenirs",
        "timeNeeded": "30-45 min",
        "category": "shopping",
        "walkTime": "Directamente conectado con el templo"
      }
    ],
    "restaurants": [
      {
        "name": "Daikokuya Tempura",
        "type": "tempura",
        "priceRange": "$$",
        "specialty": "Tempura tradicional desde 1887",
        "walkTime": "5 min desde Sensō-ji",
        "notes": "Reserva recomendada para la cena"
      }
    ],
    "practicalInfo": {
      "bestTime": "Temprano en la mañana (8-10 AM) o tarde (después de 4 PM)",
      "crowdLevel": "high",
      "duration": "2-3 horas",
      "weather": "Mayormente al aire libre",
      "tips": ["Lleva efectivo", "Respeta las normas del templo", "Fotografía permitida en exteriores"]
    }
  }
}
```

### Campos de `dayDetails`

#### `keyPlaces` (opcional)
Array de lugares clave con información detallada:
- `name`: Nombre del lugar
- `description`: Descripción detallada
- `timeSlot`: Horario recomendado (opcional)
- `importance`: "must-see", "recommended", o "optional"
- `options`: Array de opciones o alternativas (opcional)
- `trivia`: Array de datos curiosos específicos del lugar (opcional)

#### `transport` (opcional)
Información detallada de transporte:
- `overview`: Resumen general del transporte
- `routes`: Array de rutas específicas con:
  - `from`: Punto de origen
  - `to`: Destino
  - `line`: Línea de metro/tren
  - `duration`: Duración del viaje
  - `cost`: Costo del trayecto (opcional)
  - `notes`: Notas adicionales (opcional)

#### `trivia` (opcional)
Array de datos curiosos y información interesante sobre el día/lugar.

#### `nearbyActivities` (opcional)
Array de actividades adicionales "de paso":
- `name`: Nombre de la actividad
- `description`: Descripción
- `timeNeeded`: Tiempo necesario
- `category`: "shopping", "sightseeing", "cultural", "nature", "entertainment"
- `walkTime`: Tiempo de caminata desde la actividad principal (opcional)

#### `restaurants` (opcional)
Array de restaurantes recomendados:
- `name`: Nombre del restaurante
- `type`: Tipo de cocina
- `priceRange`: "$", "$$", "$$$", "$$$$"
- `specialty`: Especialidad del restaurante
- `walkTime`: Tiempo de caminata (opcional)
- `notes`: Notas adicionales (opcional)

#### `practicalInfo` (opcional)
Información práctica:
- `bestTime`: Mejor horario para visitar (opcional)
- `crowdLevel`: "low", "medium", "high" (opcional)
- `duration`: Duración recomendada (opcional)
- `weather`: Información sobre si es interior/exterior (opcional)
- `tips`: Array de consejos útiles (opcional)

### Estados de Día Disponibles

| Clase CSS | Texto Sugerido | Descripción |
|-----------|----------------|-------------|
| `status-fijo` | "Fijo" | Actividades confirmadas |
| `status-eleccion` | "Elección en grupo" | Requiere decisión grupal |
| `status-split` | "Split Asegurado" | Grupo se divide |
| `status-libre` | "Libre" | Tiempo flexible |
| `status-cerrado` | "Cerrado" | Actividades finalizadas |

## 🛠️ Desarrollo

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build para Producción

```bash
npm run build
```

### Lint con ESLint

```bash
npm run lint
```

## 📝 Guía para Actualizaciones de Contenido

### Añadir una Nueva Ciudad

1. Añade un objeto ciudad al array `ciudades` en `itinerario.json`
2. Asigna un `id` único y un `colorBorde` en formato hexadecimal
3. Define el array `dias` con las actividades correspondientes

### Crear Días con Opciones Múltiples

1. En lugar de `status` y `puntosClave` directos, usa el campo `opciones`
2. Cada opción debe tener un `id` único y un `label` descriptivo
3. Marca una opción como `isDefault: true` para selección inicial
4. Cada opción puede tener su propio `status` y `puntosClave`

### Añadir Alternativas a Actividades

1. En cualquier `puntosClave`, añade el campo `alternativas`
2. Cada alternativa debe tener `titulo` y `descripcion`
3. Las alternativas se mostrarán en una sección expandible

### 🆕 Crear Páginas de Detalles Extendidas

#### Opción 1: Detalles a nivel de día
Añade `dayDetails` directamente al objeto día:
```json
{
  "titulo": "Día 1: Mercados y Vistas",
  "fecha": "29 Nov",
  "status": [...],
  "puntosClave": [...],
  "dayDetails": {
    "keyPlaces": [...],
    "transport": {...},
    "restaurants": [...],
    // ... otros campos
  }
}
```

#### Opción 2: Detalles a nivel de opción
Añade `dayDetails` a opciones específicas:
```json
{
  "titulo": "Día 4: Opciones",
  "fecha": "2 Dic",
  "opciones": [
    {
      "id": "4a",
      "label": "4A: Arte",
      "status": [...],
      "puntosClave": [...],
      "dayDetails": {
        "keyPlaces": [...],
        "transport": {...},
        // ... campos específicos para esta opción
      }
    }
  ]
}
```

#### Compatibilidad hacia atrás
- **Los días sin `dayDetails` seguirán funcionando normalmente**
- **Mostrarán un mensaje indicando que los detalles están "en construcción"**
- **Puedes añadir detalles gradualmente según sea necesario**

### Buenas Prácticas

- **IDs únicos**: Usa IDs descriptivos para ciudades y opciones (`tokio`, `4a`, `4b`)
- **Colores consistentes**: Mantén una paleta de colores coherente para las ciudades
- **Iconos relevantes**: Usa emojis descriptivos para cada actividad
- **Textos concisos**: Mantén títulos cortos y descripciones informativas
- **Estados coherentes**: Usa los estados predefinidos para consistencia visual
- **Información práctica**: Incluye siempre horarios, precios y consejos útiles
- **Categorización clara**: Usa las categorías predefinidas para actividades
- **Detalles progresivos**: Empieza con información básica y añade detalles gradualmente

## 🧭 Navegación y Experiencia de Usuario

### Funcionalidad Principal
- **Vista Principal**: Muestra todas las ciudades y días en formato de tarjetas
- **Tarjetas Clickeables**: Cada día es clickeable y muestra "Ver detalles" al hacer hover
- **Páginas de Detalle**: Información completa con navegación breadcrumb
- **Navegación de Vuelta**: Botón para regresar al itinerario principal

### Rutas de la Aplicación
- `/` - Vista principal del itinerario
- `/day/:cityId/:dayIndex` - Página de detalle de día
- `/day/:cityId/:dayIndex/:optionId` - Página de detalle de opción específica

### Estados de Carga
- **Datos no disponibles**: Mensaje "en construcción" para días sin `dayDetails`
- **Estados de carga**: Spinner mientras se cargan los datos
- **Manejo de errores**: Mensajes informativos para errores de carga

### Ejemplo Completo de Migración

#### Antes (formato simple):
```json
{
  "titulo": "Día 4: Opciones",
  "fecha": "2 Dic",
  "status": [{ "texto": "Elección", "clase": "status-eleccion" }],
  "puntosClave": [
    { "icono": "🎨", "titulo": "Opción A: Arte", "descripcion": "Museos" },
    { "icono": "🤖", "titulo": "Opción B: Tecnología", "descripcion": "Odaiba" }
  ]
}
```

#### Después (formato con opciones):
```json
{
  "titulo": "Día 4: Opciones",
  "fecha": "2 Dic",
  "opciones": [
    {
      "id": "4a",
      "label": "4A: Arte y Cultura",
      "isDefault": true,
      "status": [{ "texto": "Elección", "clase": "status-eleccion" }],
      "puntosClave": [
        { "icono": "🎨", "titulo": "Museos de Arte", "descripcion": "Visita a galerías" }
      ]
    },
    {
      "id": "4b", 
      "label": "4B: Tecnología",
      "status": [{ "texto": "Elección", "clase": "status-eleccion" }],
      "puntosClave": [
        { "icono": "🤖", "titulo": "Odaiba Tech", "descripcion": "Exploración tecnológica" }
      ]
    }
  ]
}
```

## 🎨 Personalización

### Colores de Ciudad

Los colores de borde se definen en el campo `colorBorde` de cada ciudad. Usa formato hexadecimal:

- **Tokio**: `#EF476F` (Rosa vibrante)
- **Kioto**: `#FFD166` (Amarillo dorado)
- **Osaka**: `#06D6A0` (Verde turquesa)
- **Tokio Final**: `#118AB2` (Azul océano)

### Estados de Día

Los estilos CSS para los estados están definidos en el tema global. Puedes personalizar los colores editando las variables CSS correspondientes.

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
