# THagencia - Frontend (Next.js Headless)

Proyecto frontend de **THagencia** usando **Next.js** como framework de React y **WordPress** como CMS (Headless).

## Stack Tecnológico

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** (estilos)
- **GSAP** (animaciones)
- **lucide-react** (iconos)
- **WordPress REST API** (backend headless)

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz con metadatos SEO
│   ├── page.tsx            # Home page (integra todos los componentes)
│   └── globals.css         # Estilos globales + Tailwind
├── components/
│   ├── Header.tsx          # Navbar con menú responsive
│   ├── Hero.tsx            # Sección hero principal
│   ├── Manifest.tsx        # Sección "Quiénes somos"
│   ├── Services.tsx        # Los 3 pilares de servicios
│   ├── Portfolio.tsx       # Grid de proyectos (bento layout)
│   ├── FAQ.tsx             # Preguntas frecuentes
│   ├── SEOBlock.tsx        # Bloque de contenido SEO
│   ├── Footer.tsx          # Footer con CTA
│   └── CustomCursor.tsx    # Cursor magnético (GSAP)
├── hooks/
│   └── useGSAPAnimations.ts # Hooks para animaciones (scroll reveal, floating)
├── lib/
│   ├── content.ts          # Datos de servicios, proyectos, FAQ
│   ├── wp/
│   │   ├── config.ts       # Configuración de WordPress
│   │   ├── types.ts        # Types para REST API
│   │   └── rest.ts         # Cliente de fetch para WP REST
│   └── wp-graphql/         # (Futuro) Cliente para WP GraphQL
└── .env.example            # Plantilla de variables de entorno
```

## Instalación

```bash
# Clonar o descargar el proyecto
git clone <repo> thagencia
cd thagencia

# Instalar dependencias
npm install
```

## Configuración de WordPress (Headless)

### 1. Crear archivo `.env.local`

```bash
cp .env.example .env.local
```

### 2. Configurar `NEXT_PUBLIC_WP_BASE_URL`

```env
# .env.local
NEXT_PUBLIC_WP_BASE_URL=https://tuwordpress.com
WORDPRESS_API_URL=https://tuwordpress.com/graphql
# Opcional: ID numérico del media item usado como logo
WORDPRESS_SITE_LOGO_ID=123
# Opcional: token Bearer si tu GraphQL está protegido
# WORDPRESS_AUTH_TOKEN=xxxxxxxx
```

Reemplaza con tu dominio real y, si usas WPGraphQL, apunta a `/graphql`.

### 3. Habilitar GraphQL (WPGraphQL)
- Instala y activa el plugin **WPGraphQL** en WordPress.
- (Opcional) Si tu logo está en `Apariencia > Personalizar > Identidad del sitio`, obtén el ID del media item y colócalo en `WORDPRESS_SITE_LOGO_ID`.
- Si tu endpoint requiere auth (JWT/Bearer), define `WORDPRESS_AUTH_TOKEN`.

### 4. REST API (opcional)
Para compatibilidad previa, sigue disponible `NEXT_PUBLIC_WP_BASE_URL` apuntando a `/wp-json`.  
Verifica: `https://tuwordpress.com/wp-json/wp/v2/posts`

## Desarrollo Local

```bash
# Correr servidor de desarrollo (http://localhost:3000)
npm run dev
```

El servidor se recargará automáticamente cuando guardes cambios.

## Build & Producción

```bash
# Build para producción
npm run build

# Correr build localmente
npm start
```

## Características

### ✨ Animaciones (GSAP)

- Cursor magnético personalizado
- Scroll reveal (elementos aparecen al hacer scroll)
- Elementos flotantes en el hero
- Transiciones suaves entre secciones
\n### 🎨 Diseño

- Responsive (mobile, tablet, desktop)
- Tema oscuro moderno
- Tipografía escalable
- Effecto grain en fondo
\n### 📱 Componentes Reutilizables

- Header (navbar con menú mobile)
- Hero section con CTAs
- Service cards
- Portfolio bento grid
- FAQ accordion
- Footer con datos de contacto

## Próximos Pasos

### 1. Conectar WordPress
- [ ] Validar que REST API de WordPress esté accesible
- [ ] Actualizar `getLatestPosts()` en `src/lib/wp/rest.ts` para traer datos reales
- [ ] Crear páginas dinámicas para posts (`src/app/blog/[slug]`)

### 2. Implementar CMS dinámico
- [ ] Portafolio: traer proyectos desde WordPress
- [ ] Servicios: editar desde WordPress (custom post type)
- [ ] FAQ: gestionar desde WordPress

### 3. SEO & Performance
- [ ] Agregar `next/image` para optimizar imágenes
- [ ] Sitemap dinámico
- [ ] Schema.org structured data
- [ ] Canonical URLs
\n### 4. Formularios & Contacto
- [ ] Integración con formulario de contacto (Formspree, SendGrid, etc.)
- [ ] Newsletter subscription
\n## Deployment\n\n### Vercel (Recomendado)\n\n```bash\n# Conectar repo a Vercel\nvercel link\n\n# Deploy automático al push a main\nvercel\n```\n\n### Otros Providers\n- Netlify\n- AWS Amplify\n- Self-hosted (VPS)\n\n## Documentación\n\n- [Next.js Docs](https://nextjs.org/docs)\n- [GSAP Docs](https://gsap.com/docs)\n- [Tailwind CSS](https://tailwindcss.com)\n- [WordPress REST API](https://developer.wordpress.org/rest-api/)\n\n## Soporte\n\nPara issues, feature requests o dudas, contactar a THagencia.\n\n---\n\n© 2026 THagencia. Hecho en Querétaro para el mundo.
