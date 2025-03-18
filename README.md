# Angular 19 Playlist Manager

## Descripción

Este proyecto es un **Playlist Manager** desarrollado con **Angular 19 Standalone** en el frontend y **Spring Boot** en el backend, utilizando **H2** como base de datos en memoria. La aplicación permite gestionar listas de reproducción, agregar canciones y visualizarlas de manera eficiente. 

### Características:
- Interfaz de usuario moderna y reactiva desarrollada con **Angular 19 Standalone**.
- Backend construido con **Spring Boot** para manejar la lógica de las listas de reproducción y canciones.
- **H2** como base de datos en memoria para almacenar las listas de reproducción y las canciones.
- Soporte para ingresar canciones con los siguientes campos:
  - **Título**
  - **Artista**
  - **Álbum**
  - **Año de lanzamiento**
  - **Género**

## Tecnologías

- **Frontend**: Angular 19 Standalone
- **Backend**: Spring Boot (Java 21)
- **Base de datos**: H2 (base de datos en memoria)
- **Autenticación**: JWT para manejo de sesiones de usuario
- **Notificaciones**: `ngx-toastr` para mostrar notificaciones

## Requisitos

- **Node.js** (versión 16 o superior)
- **npm** (versión 8 o superior)
- **Java 21**
- **Spring Boot** (version 2.7+)
- **Maven** (para el backend)
- **H2 Database** (para la base de datos en memoria)

## Instalación

### 1. Configuración del Backend

1. Clona el repositorio y navega a la carpeta del proyecto backend:
   ```bash
   git clone https://github.com/AlexsDarn/spring-jwt-jpa-h2
   cd backend
   ```

2. Abre el archivo `application.properties` en la carpeta `src/main/resources` y asegúrate de que la configuración de la base de datos H2 esté habilitada.

3. Construye el proyecto con Maven:
   ```bash
   mvn clean install
   ```

4. Ejecuta la aplicación de Spring Boot:
   ```bash
   mvn spring-boot:run
   ```

El backend debería estar corriendo en `http://localhost:8080`.

### 2. Configuración del Frontend

1. Clona el repositorio del frontend y navega a la carpeta del proyecto frontend:
   ```bash
   git clone https://github.com/AlexsDarn/front-jwt-angular19
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las rutas en `src/app/core/services/http-provider.service.ts` para conectar el frontend con el backend. Asegúrate de que la URL del backend coincida con la de tu configuración (`http://localhost:8080`).

4. Ejecuta el servidor de desarrollo de Angular:
   ```bash
   ng serve
   ```

El frontend debería estar corriendo en `http://localhost:4200`.

## Uso

### Agregar una nueva canción

Para agregar canciones a una lista de reproducción, ingresa los siguientes detalles:

| Título                | Artista         | Álbum                | Año de Lanzamiento | Género        |
|-----------------------|-----------------|----------------------|--------------------|---------------|
| The Forgotten Castle  | Dark Lord       | Echoes of the Dungeon | 1998               | Dungeon Synth |
| Mystic Fog            | Ancient Sorcery | Arcane Melodies      | 2002               | Dungeon Synth |
| Moonlit Ruins         | Shadow Wizard   | Tales of the Night   | 2005               | Dungeon Synth |

debe ser en texto plano separado por ,
The Forgotten Castle, Dark Lord, Echoes of the Dungeon, 1998, Dungeon Synth
Mystic Fog, Ancient Sorcery, Arcane Melodies, 2002, Dungeon Synth
Moonlit Ruins, Shadow Wizard, Tales of the Night, 2005, Dungeon Synth

### Visualizar y gestionar las listas de reproducción

Una vez que las canciones se hayan agregado, puedes verlas en las listas de reproducción. La aplicación mostrará la información como el título de la canción, el artista, el álbum, el año de lanzamiento y el género.

## Ejemplo de Endpoint para Crear una Canción

Para agregar una canción, utiliza el siguiente endpoint de la API:

### **POST** `http://localhost:8080/lists`

**Cuerpo de la solicitud (JSON):**
```json
{
    "name": "Dungeon Synth Classics",
    "description": "Una recopilación de los mejores temas de dungeon synth.",
    "songs": [
        {
            "title": "The Forgotten Castle",
            "artist": "Dark Lord",
            "album": "Echoes of the Dungeon",
            "releaseYear": 1998,
            "genre": "Dungeon Synth"
        },
        {
            "title": "Mystic Fog",
            "artist": "Ancient Sorcery",
            "album": "Arcane Melodies",
            "releaseYear": 2002,
            "genre": "Dungeon Synth"
        },
        {
            "title": "Moonlit Ruins",
            "artist": "Shadow Wizard",
            "album": "Tales of the Night",
            "releaseYear": 2005,
            "genre": "Dungeon Synth"
        }
    ]
}

```

### **GET** `/api/playlists/{playlistId}/songs`

Este endpoint devuelve todas las canciones de una lista de reproducción específica.

## Rutas del Proyecto

### Frontend

- **/home**: Página principal donde se gestionan las listas de reproducción.
- **/playlists/view-playlist/{name}**: Página donde se muestran los detalles de una playlist específica, incluyendo sus canciones.

### Backend

- Revisar en la carpeta resources el archivo openapi.yaml

## Licencia

Este proyecto está licenciado bajo la **MIT License** - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

¡Gracias por usar Dungeon Synth Playlist Manager! 🎶
