# NicaOfisel Mobile - Design Plan

## Overview
NicaOfisel es una plataforma móvil multi-vendedor para compra y venta de celulares en Nicaragua. La app permite a emprendedores crear mini-tiendas personalizadas, mientras que los compradores pueden explorar productos, recibir asesoría de un chatbot IA y calificar tiendas.

## Screen List

### Autenticación
1. **Login Screen** - Inicio de sesión con OAuth
2. **Register Screen** - Registro de nuevo usuario (comprador o vendedor)
3. **Role Selection** - Seleccionar si es comprador o vendedor

### Comprador (Buyer)
4. **Home Screen** - Exploración principal con categorías y destacados
5. **Catalog Screen** - Catálogo de productos con filtros y búsqueda
6. **Store Detail Screen** - Detalle de mini-tienda del vendedor
7. **Product Detail Screen** - Detalle completo del producto
8. **Chat Screen** - Chatbot de asesoría de ventas
9. **Favorites Screen** - Productos guardados como favoritos
10. **Reviews Screen** - Ver reseñas de una tienda
11. **Cart Screen** - Carrito de compras (referencia a WhatsApp)
12. **Profile Screen** - Perfil del comprador

### Vendedor (Seller)
13. **Seller Dashboard** - Panel de control del vendedor
14. **My Store Screen** - Gestión de mini-tienda
15. **Add Product Screen** - Agregar nuevo producto
16. **Edit Product Screen** - Editar producto existente
17. **Promotions Screen** - Gestionar promociones
18. **Store Settings Screen** - Configurar número de WhatsApp, descripción, etc.
19. **Store Analytics Screen** - Ver estadísticas de tienda

## Primary Content and Functionality

### Home Screen (Comprador)
- **Hero Section**: Bienvenida y búsqueda rápida
- **Featured Stores**: Tiendas destacadas con calificación
- **Categories**: Grid de categorías (Smartphones, Tablets, Accesorios, etc.)
- **Trending Products**: Productos más vistos
- **Recommended**: Recomendaciones personalizadas

### Catalog Screen
- **Search Bar**: Búsqueda por nombre o marca
- **Filters**: Precio, marca, condición (nuevo/seminuevo), calificación
- **Product Grid**: Cards con imagen, precio, tienda, calificación
- **Sorting**: Ordenar por precio, novedad, popularidad

### Store Detail Screen
- **Store Header**: Logo, nombre, calificación con estrellas, número de reseñas
- **Store Info**: Descripción, ubicación, tiempo de respuesta
- **Contact Button**: Botón directo a WhatsApp
- **Products Tab**: Productos de la tienda
- **Reviews Tab**: Reseñas y calificaciones
- **Like/Follow**: Opción para seguir la tienda

### Product Detail Screen
- **Image Gallery**: Carrusel de imágenes del producto
- **Product Info**: Nombre, precio, descripción, especificaciones
- **Store Info**: Nombre tienda, calificación, botón WhatsApp
- **Actions**: Agregar a favoritos, compartir
- **Reviews**: Últimas reseñas del producto
- **CTA**: Botón "Contactar por WhatsApp"

### Chat Screen (Chatbot)
- **Chat Interface**: Mensajes del usuario y bot
- **Smart Responses**: El bot responde preguntas sobre productos
- **Product Recommendations**: Sugerencias basadas en conversación
- **Quick Actions**: Botones para acciones comunes
- **Context Awareness**: El bot sabe qué tienda/producto estás viendo

### Seller Dashboard
- **Quick Stats**: Número de productos, visitas, ventas
- **Recent Orders**: Últimos contactos/consultas
- **Store Performance**: Gráfico de visitas
- **Quick Actions**: Agregar producto, ver tienda, responder mensajes

### My Store Screen
- **Store Header**: Editar logo, nombre, descripción
- **Products List**: Lista de productos con opciones de editar/eliminar
- **Add Product Button**: Botón flotante para agregar
- **Store Settings**: Acceso a configuración

### Add/Edit Product Screen
- **Image Upload**: Cargar múltiples fotos
- **Product Info**: Nombre, descripción, especificaciones
- **Pricing**: Precio, promoción (opcional)
- **Category**: Seleccionar categoría
- **Condition**: Nuevo/Seminuevo
- **Save Button**: Guardar cambios

### Promotions Screen
- **Active Promotions**: Lista de promociones activas
- **Create Promotion**: Crear nueva promoción (descuento %, oferta especial)
- **Schedule**: Fecha inicio y fin
- **Target Products**: Seleccionar qué productos aplican

### Store Settings Screen
- **Store Name**: Nombre editable
- **Description**: Descripción de la tienda
- **WhatsApp Number**: Número con código de país
- **Store Logo**: Cambiar logo
- **Business Hours**: Horario de atención (opcional)
- **Location**: Ubicación/zona de entrega

## Key User Flows

### Flujo de Comprador
1. **Discovery**: Usuario abre app → ve home con tiendas destacadas → navega catálogo
2. **Exploration**: Busca producto → ve resultados → toca producto → ve detalles
3. **Engagement**: Lee reseñas → chatea con bot para preguntas → agrega a favoritos
4. **Purchase**: Toca "Contactar por WhatsApp" → se abre WhatsApp con mensaje preformulado

### Flujo de Vendedor
1. **Setup**: Registra como vendedor → crea mini-tienda → sube foto de logo
2. **Inventory**: Agrega productos con fotos, precios, descripción
3. **Promotion**: Crea promociones para destacar productos
4. **Management**: Ve estadísticas, responde consultas, edita productos
5. **Contact**: Clientes lo contactan por WhatsApp directamente

### Flujo de Chatbot
1. Usuario está en product detail → abre chat
2. Bot da bienvenida y pregunta qué busca
3. Usuario hace preguntas sobre especificaciones, precio, disponibilidad
4. Bot responde con info del producto y tienda
5. Bot sugiere productos similares o relacionados
6. Usuario puede contactar tienda directamente desde chat

## Color Choices

**Inspirado en NicaOfisel (esmeralda oscuro + lima):**

| Token | Color | Uso |
|-------|-------|-----|
| `background` | #050807 | Fondo principal (casi negro con tinte verde) |
| `surface` | #0e1815 | Cards y superficies elevadas |
| `primary` | #1eb37e | Botones principales, acciones (esmeralda) |
| `accent` | #baff5c | Precios, CTAs destacadas (lima) |
| `foreground` | #eef7f2 | Texto principal |
| `muted` | #90a89c | Texto secundario |
| `success` | #22C55E | Estados positivos |
| `warning` | #F59E0B | Alertas |
| `error` | #EF4444 | Errores |

**Tipografía:**
- Display: Space Grotesk (títulos, precios)
- Body: Segoe UI / SF Pro Display (contenido)

## Animations & Polish

- **Fade-in**: Entrada suave de cards y pantallas
- **Scale**: Feedback de botones (0.97 en press)
- **Slide**: Transiciones entre pantallas
- **Haptics**: Feedback táctil en acciones principales
- **Skeleton Loading**: Placeholders mientras carga contenido

## Data Models

### User
```
- id: int
- openId: string (OAuth)
- name: string
- email: string
- role: "buyer" | "seller"
- avatar: string (URL)
- createdAt: timestamp
```

### Store (Mini-tienda)
```
- id: int
- userId: int (vendedor)
- name: string
- description: text
- logo: string (URL)
- whatsapp: string
- location: string
- rating: float (0-5)
- reviewCount: int
- createdAt: timestamp
- updatedAt: timestamp
```

### Product
```
- id: int
- storeId: int
- name: string
- description: text
- price: decimal
- promotionalPrice: decimal (opcional)
- images: string[] (URLs)
- category: string
- condition: "new" | "used"
- specs: JSON (especificaciones)
- createdAt: timestamp
```

### Review
```
- id: int
- storeId: int
- userId: int (comprador)
- rating: int (1-5)
- comment: text
- createdAt: timestamp
```

### Favorite
```
- id: int
- userId: int
- productId: int
- createdAt: timestamp
```

### ChatMessage
```
- id: int
- userId: int
- storeId: int
- message: text
- sender: "user" | "bot"
- createdAt: timestamp
```

---

**Próximos pasos**: Implementar autenticación, base de datos, y pantallas principales.
