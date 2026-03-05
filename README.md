# ezegrenat.github.io

Portfolio personal y blog de proyectos de ciencia de datos, construido con Jekyll y hosteado en GitHub Pages. El diseño es completamente custom — sin Bootstrap ni frameworks externos — con un sistema de componentes en CSS vanilla, dark mode automático y animaciones CSS.

**[Ver sitio en vivo →](https://ezegrenat.github.io)**

---

## Estructura del repositorio

```
ezegrenat.github.io/
│
├── _posts/                  # Publicaciones (proyectos y ensayos)
├── _drafts/                 # Borradores (no se publican)
├── _layouts/                # Plantillas de página
│   ├── default.html         # Base: navbar + footer + scripts
│   ├── home.html            # Página principal: hero + grid de cards
│   ├── post.html            # Página de un post individual
│   └── page.html            # Página estática (About, etc.)
├── _includes/               # Componentes reutilizables
│   ├── head.html            # <head>: meta, fuentes, CSS
│   ├── navbar.html          # Navegación sticky con glassmorphism
│   ├── footer.html          # Footer con links sociales
│   ├── scripts.html         # Scripts JS al final del body
│   ├── read_time.html       # Calcula tiempo estimado de lectura
│   └── google-analytics.html
├── _sass/
│   └── styles.scss          # Todo el CSS del sitio (design system completo)
├── assets/
│   ├── main.scss            # Punto de entrada SCSS (Jekyll lo compila)
│   └── scripts.js           # JS vanilla: dark mode, nav mobile, animaciones
├── img/                     # Imágenes del sitio
├── posts/
│   └── index.html           # Listado paginado de todos los posts
├── about.md                 # Página "Acerca de mí"
├── contact.html             # Página de contacto
└── _config.yml              # Configuración de Jekyll
```

---

## Tecnologías

- **Jekyll** — generador de sitios estáticos, corre en GitHub Pages sin configuración adicional
- **SCSS** — compilado por Jekyll a CSS, un solo archivo en `_sass/styles.scss`
- **CSS vanilla** — sin Bootstrap ni ningún framework de estilos externo
- **JS vanilla** — sin jQuery. Maneja dark mode, navegación mobile e Intersection Observer para animaciones
- **Google Fonts** — Inter (UI) + Lora (cuerpo de texto), cargadas de forma gratuita
- **Font Awesome 5** — íconos, cargado desde CDN gratuito

---

## Sistema de diseño

El sitio usa CSS custom properties para todos los valores de diseño, lo que hace que el dark mode funcione con un solo atributo en el `<html>`:

```css
:root {
  --orange:     #F97316;
  --blue:       #3B82F6;
  --bg:         #F8FAFC;
  --surface:    #FFFFFF;
  --text:       #0F172A;
  /* ... */
}

[data-theme="dark"] {
  --bg:         #0F172A;
  --surface:    #1E293B;
  --text:       #F1F5F9;
  /* ... */
}
```

**Tipografía:**
- Headers (`h1`–`h6`): **Impact** — contundente, editorial
- Cuerpo de texto: **Lora** — serif clásica, muy legible en pantalla
- UI (navbar, botones, labels): **Inter** — sans-serif limpia

---

## Agregar una publicación

Todos los posts viven en `_posts/` con el formato de nombre `YYYY-MM-DD-titulo-del-post.md`.

### Front matter disponible

```yaml
---
layout: post
title: "Título de la publicación"
subtitle: "Descripción breve que aparece en las cards"
date: 2024-06-01
type: proyecto          # "proyecto" (naranja) o "ensayo" (azul)
background: '/img/imagen-de-portada.jpg'   # opcional
link: "https://github.com/ezegrenat/repo"  # opcional — ver más abajo
repo_date: 2024-03-15                      # opcional — ver más abajo
---
```

### Tipos de publicación

El campo `type` controla el tag que aparece en la card:

| Valor | Tag | Color |
|-------|-----|-------|
| `proyecto` | Proyecto | Naranja |
| `ensayo` | Ensayo | Azul |

Si no se especifica `type`, por defecto se muestra "Proyecto".

### Fecha de creación del repositorio

El campo `repo_date` es opcional. Si se define, la card muestra esa fecha en lugar del campo `date` del post. Útil cuando la fecha en que escribiste el post difiere de cuándo creaste el repositorio en GitHub.

```yaml
repo_date: 2023-08-20   # fecha de creación del repo en GitHub
```

Si no se especifica, la card usa automáticamente el campo `date` del post como fallback.

### Redirección a un repositorio externo

El campo `link` es opcional. Si se define, el botón de la card apunta directamente a esa URL (en una pestaña nueva) en lugar de abrir la página del post en el sitio.

Esto es útil para proyectos que ya tienen su propia documentación en GitHub:

```yaml
# Con link → la card redirige al repositorio de GitHub
---
layout: post
title: "Análisis de texto con NLP"
type: proyecto
link: "https://github.com/ezegrenat/nlp-analisis"
---

# Sin link → la card abre la página del post en el sitio
---
layout: post
title: "Por qué los datos no son neutrales"
type: ensayo
---
```

---

## Dark mode

El tema se detecta automáticamente según la preferencia del sistema operativo (`prefers-color-scheme`). El usuario puede cambiarlo manualmente con el botón 🌙 en la navbar — la preferencia queda guardada en `localStorage`.

Para evitar el "flash" de contenido sin estilos al cargar la página, el tema se aplica en el `<head>` antes de que el navegador pinte nada:

```html
<script>
  var stored  = localStorage.getItem('theme');
  var prefer  = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', stored || prefer);
</script>
```

---

## Configuración del sitio

Los datos del sitio se configuran en `_config.yml`:

```yaml
title:       Portfolio de Ezequiel Grenat
email:       ezequielggrenat@gmail.com
description: Data scientist | Estudiante de Ciencia de Datos
url:         "https://ezegrenat.github.io"
```

Los links de redes sociales en el footer se activan descomentando las variables correspondientes en `_config.yml`:

```yaml
twitter_username:   tu_usuario
github_username:    tu_usuario
linkedin_username:  tu_usuario
instagram_username: tu_usuario
```

---

## Correr el sitio localmente

```bash
# Instalar dependencias
bundle install

# Levantar servidor de desarrollo (con live reload)
bundle exec jekyll serve

# El sitio queda disponible en http://localhost:4000
```

Para ver los drafts de `_drafts/` también:

```bash
bundle exec jekyll serve --drafts
```

---

## Deploy

El sitio se deploya automáticamente en GitHub Pages cada vez que se hace un push a la rama `master`. No hay ningún paso adicional — GitHub Pages detecta que es un sitio Jekyll y lo compila solo.

```bash
git add .
git commit -m "descripción del cambio"
git push origin master
```

Los cambios tardan entre 1 y 3 minutos en verse reflejados en `https://ezegrenat.github.io`.
