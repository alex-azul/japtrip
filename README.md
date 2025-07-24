# My Trip Guide - Guía de Viaje Interactiva

Una aplicación web desarrollada en Vue 3 para mostrar itinerarios de viaje de forma interactiva y visualmente atractiva. Incluye soporte para opciones de días múltiples y alternativas de actividades.

## 🚀 Características

- **Interfaz interactiva** con Vue 3 y Composition API
- **Opciones de días múltiples** (ej: Día 4A vs Día 4B)
- **Alternativas de actividades** dentro de cada día
- **Diseño responsive** optimizado para móviles
- **Persistencia de selecciones** con localStorage
- **Gestión de estado** con Pinia
- **TypeScript** para mayor robustez del código

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── DayCard.vue       # Componente principal de tarjetas de día
│   ├── CitySection.vue   # Sección de cada ciudad
│   └── AppHeader.vue     # Cabecera de la aplicación
├── stores/
│   └── itinerary.ts      # Store de Pinia para gestión de estado
├── types/
│   └── itinerary.ts      # Interfaces TypeScript
└── views/
    └── ItineraryView.vue # Vista principal del itinerario

public/
└── itinerario.json       # Datos del itinerario
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

### Buenas Prácticas

- **IDs únicos**: Usa IDs descriptivos para ciudades y opciones (`tokio`, `4a`, `4b`)
- **Colores consistentes**: Mantén una paleta de colores coherente para las ciudades
- **Iconos relevantes**: Usa emojis descriptivos para cada actividad
- **Textos concisos**: Mantén títulos cortos y descripciones informativas
- **Estados coherentes**: Usa los estados predefinidos para consistencia visual

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
