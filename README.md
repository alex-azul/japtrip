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
- **🆕 Easter eggs y desafíos interactivos** para exploración activa
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
│   ├── TriviaSection.vue      # Datos curiosos y trivia
│   └── EasterEggsSection.vue  # 🆕 Easter eggs y desafíos interactivos
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
      {
        "question": "¿En qué año fue fundado el templo Sensō-ji?",
        "answer": "El templo fue fundado en el año 628 DC por dos hermanos pescadores que encontraron una estatua de Kannon en el río Sumida.",
        "password": "628"
      },
      {
        "question": "¿Cuántos años de antigüedad tiene la calle comercial Nakamise?",
        "answer": "La calle Nakamise tiene más de 300 años de antigüedad y es una de las calles comerciales más antiguas de Japón.",
        "password": "nakamise"
      }
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
    },
    "easterEggs": [
      {
        "type": "hunt",
        "title": "La Búsqueda de los Kitsune",
        "description": "Encuentra todas las estatuas de zorros (kitsune) escondidas en el complejo del templo. Hay al menos 7 estatuas en diferentes edificios secundarios.",
        "hint": "Los zorros guardianes suelen estar cerca de santuarios secundarios",
        "category": "Exploración Cultural",
        "reward": "Una comprensión más profunda del simbolismo sintoísta japonés",
        "difficulty": "medium"
      },
      {
        "type": "photo-challenge",
        "title": "La Perspectiva Perfecta",
        "description": "Captura el farolillo gigante desde tres ángulos únicos: desde abajo, desde el mirador, y como marco de la calle comercial.",
        "hint": "La madrugada y última hora ofrecen menos multitudes",
        "category": "Fotografía",
        "reward": "Un tríptico fotográfico único",
        "difficulty": "hard"
      }
    ]
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
Array de preguntas interactivas con respuestas protegidas por contraseña:
- `question`: Pregunta visible para los viajeros
- `answer`: Respuesta detallada que se revela tras la contraseña correcta
- `password`: Palabra clave que deben encontrar en el lugar (insensible a mayúsculas)

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

#### 🆕 `easterEggs` (opcional)
Array de Easter eggs y desafíos interactivos para fomentar la exploración activa:
- `type`: Tipo de Easter egg - "hunt", "reference", "cultural", "photo-challenge", "secret", "discovery"
- `title`: Título del desafío
- `description`: Descripción detallada del Easter egg
- `hint`: Pista para encontrar/completar el desafío (opcional)
- `category`: Categoría descriptiva (opcional)
- `reward`: Descripción de la "recompensa" por completar el desafío (opcional)
- `difficulty`: Nivel de dificultad - "easy", "medium", "hard" (opcional)

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

## 🧠 Trivia Interactiva con Contraseñas

### Nueva Funcionalidad de Trivia

La sección de trivia ha sido completamente renovada para convertirse en un juego interactivo durante el viaje. En lugar de mostrar datos curiosos estáticos, ahora presenta **preguntas con respuestas protegidas por contraseña**.

### Mecánica de Juego

#### Pregunta → Contraseña → Respuesta
1. **Pregunta visible**: Se muestra la pregunta completa para todos los viajeros
2. **Búsqueda de contraseña**: Los viajeros deben encontrar la respuesta en el lugar visitado
3. **Desbloqueo**: Al introducir la contraseña correcta, se revela la respuesta detallada
4. **Aprendizaje activo**: Fomenta la exploración y observación durante el viaje

#### Estructura de Datos para Trivia

```json
{
  "trivia": [
    {
      "question": "¿Cuál era el papel histórico de Asakusa durante el período Edo?",
      "answer": "Asakusa era el principal distrito de entretenimiento de Tokio durante el Período Edo. Aquí se concentraban teatros, casas de té, restaurantes y todo tipo de espectáculos para el pueblo.",
      "password": "edo"
    },
    {
      "question": "¿Qué pasó con el área de Asakusa durante la Segunda Guerra Mundial?",
      "answer": "A pesar de su aspecto antiguo, gran parte del área fue reconstruida después de los bombardeos de la Segunda Guerra Mundial. El templo Sensō-ji y muchos edificios fueron destruidos y luego reconstruidos como símbolo de paz y renacimiento.",
      "password": "paz"
    }
  ]
}
```

#### Campos de TriviaItem
- `question`: La pregunta que se muestra a los viajeros
- `answer`: Respuesta detallada que se revela tras introducir la contraseña
- `password`: Palabra clave que los viajeros deben encontrar (insensible a mayúsculas/minúsculas)

### Experiencia de Usuario en Trivia

#### Interacción
- **Campo de entrada**: Input para introducir la contraseña encontrada
- **Validación**: Comprobación automática al pulsar Enter o botón "Revelar"
- **Feedback**: Mensaje de error si la contraseña es incorrecta  
- **Revelación**: La respuesta aparece en un área destacada con posibilidad de ocultar

#### Diseño Visual
- **Preguntas destacadas**: Texto prominente para facilitar la lectura
- **Respuestas diferenciadas**: Área especial con fondo de color para las respuestas reveladas
- **Responsive**: Adaptado para móviles con botones apilados

### Buenas Prácticas para Trivia

#### Diseño de Preguntas
- **Específicas del lugar**: Relacionadas directamente con lo que están visitando
- **Observables**: Las respuestas deben ser encontrables en el sitio
- **Educativas**: Que aporten valor cultural o histórico real

#### Contraseñas Efectivas
- **Simples**: Una sola palabra o concepto clave
- **Visibles**: Deben estar en carteles, placas informativas o elementos del lugar
- **Relevantes**: Relacionadas directamente con la respuesta
- **Variadas**: Diferentes tipos (fechas, nombres, conceptos)

#### Respuestas Enriquecidas
- **Contexto amplio**: Más información que solo la básica
- **Conexiones**: Relaciones con otros aspectos del viaje
- **Datos interesantes**: Detalles que enriquecen la experiencia

## 🥚 Easter Eggs y Desafíos Interactivos

### ¿Qué son los Easter Eggs?

Los Easter eggs son elementos interactivos especiales que transforman la experiencia de viaje de pasiva a activa. En lugar de simplemente visitar lugares, los viajeros participan en búsquedas, desafíos y descubrimientos que profundizan su conexión con la cultura local.

### Tipos de Easter Eggs

#### 🔍 `hunt` - Búsquedas y Cazas del Tesoro
Desafíos que requieren encontrar elementos específicos en ubicaciones:
```json
{
  "type": "hunt",
  "title": "La Búsqueda de los Kitsune",
  "description": "Encuentra todas las estatuas de zorros (kitsune) escondidas en el complejo del templo...",
  "hint": "Los zorros guardianes suelen estar cerca de santuarios secundarios",
  "category": "Exploración Cultural",
  "difficulty": "medium"
}
```

#### 🎬 `reference` - Referencias Culturales
Conexiones con anime, películas, libros o elementos de cultura pop:
```json
{
  "type": "reference", 
  "title": "Escenario de Your Name",
  "description": "El río Sumida aparece en varias escenas de la película anime 'Your Name'...",
  "hint": "El puente Azumabashi ofrece la vista más cinematográfica",
  "category": "Cultura Pop",
  "difficulty": "easy"
}
```

#### 🏛️ `cultural` - Inmersión Cultural
Actividades que enseñan tradiciones, rituales o costumbres locales:
```json
{
  "type": "cultural",
  "title": "El Ritual Correcto del Incienso", 
  "description": "Observa y practica cómo los locales realizan el ritual del incienso...",
  "hint": "Observa a los ancianos locales, ellos conocen la técnica perfecta",
  "category": "Tradiciones Religiosas",
  "difficulty": "easy"
}
```

#### 📸 `photo-challenge` - Desafíos Fotográficos
Retos específicos de fotografía que capturan perspectivas únicas:
```json
{
  "type": "photo-challenge",
  "title": "La Perspectiva Perfecta del Farolillo",
  "description": "Captura el farolillo gigante desde tres ángulos únicos...",
  "hint": "La madrugada y última hora ofrecen menos multitudes",
  "category": "Fotografía",
  "difficulty": "hard"
}
```

#### 🤫 `secret` - Secretos y Gemas Ocultas
Lugares, tiendas o experiencias no turísticas que requieren búsqueda:
```json
{
  "type": "secret",
  "title": "El Sake Secreto de Kuramae",
  "description": "Una pequeña tienda de sake escondida que no aparece en guías turísticas...",
  "hint": "Busca el noren azul marino con caracteres kanji dorados",
  "category": "Gemas Ocultas",
  "difficulty": "hard"
}
```

#### ✨ `discovery` - Descubrimientos Únicos
Encuentros especiales con folclore local, historia o fenómenos naturales:
```json
{
  "type": "discovery",
  "title": "Los Gatos Guardianes de Asakusa",
  "description": "Encuentra al gato calicó 'Mamoru-chan' que aparece siempre a las 18:00...",
  "hint": "Busca cerca de las estatuas de Jizō con baberos rojos",
  "category": "Folclore Local", 
  "difficulty": "medium"
}
```

### Experiencia del Usuario

#### Contenido Siempre Visible
- **Información completa**: Los Easter eggs muestran toda la información de inmediato
- **Descripción detallada**: Incluye el desafío completo con categoría y recompensa
- **Pista adicional**: Se muestra como comentario extra para ayudar en la búsqueda
- **Sin interacción requerida**: Todo el contenido es accesible directamente

#### Sistema de Dificultad
- **🟢 Easy**: Desafíos accesibles para todos los viajeros
- **🟡 Medium**: Requieren algo de exploración o tiempo adicional  
- **🔴 Hard**: Desafíos complejos que requieren dedicación especial

#### Categorización Temática
- **Exploración Cultural**: Conexión profunda con tradiciones locales
- **Cultura Pop**: Referencias a anime, películas y entretenimiento
- **Fotografía**: Desafíos visuales y perspectivas únicas
- **Tradiciones Religiosas**: Participación en rituales y costumbres
- **Gemas Ocultas**: Lugares secretos fuera del turismo convencional
- **Folclore Local**: Historias y leyendas de la zona

### Implementación en el JSON

Los Easter eggs se añaden al objeto `dayDetails` como un array opcional:

```json
{
  "dayDetails": {
    "keyPlaces": [...],
    "transport": {...},
    "trivia": [...],
    "easterEggs": [
      {
        "type": "hunt|reference|cultural|photo-challenge|secret|discovery",
        "title": "Título del desafío",
        "description": "Descripción detallada del Easter egg",
        "hint": "Pista opcional para ayudar al usuario",
        "category": "Categoría descriptiva opcional",
        "reward": "Descripción de la recompensa opcional",
        "difficulty": "easy|medium|hard (opcional)"
      }
    ]
  }
}
```

### Buenas Prácticas para Easter Eggs

#### Contenido
- **Específicos y localizados**: Cada Easter egg debe ser único para su ubicación
- **Culturalmente auténticos**: Basados en información real y verificable
- **Balanceados en dificultad**: Mezcla de fáciles, medios y difíciles
- **Recompensas significativas**: Que aporten valor real a la experiencia

#### Redacción
- **Títulos atractivos**: Que generen curiosidad sin revelar todo
- **Descripciones detalladas**: Suficiente información para completar el desafío
- **Pistas útiles**: Que guíen sin quitar la diversión del descubrimiento
- **Lenguaje motivador**: Que inspire a la acción y exploración

#### Diseño de la Experiencia
- **2-4 Easter eggs por día**: No saturar la experiencia
- **Variedad de tipos**: Mezclar diferentes categorías y dificultades
- **Conexión con el itinerario**: Que complementen las actividades principales
- **Tiempo realista**: Que sean factibles dentro del horario del día

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
