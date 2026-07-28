# Angular eCommerce Project Structure

This project follows a **feature-based architecture** to keep the code modular, scalable, reusable, and easy to maintain.

```
src/
└── app/
    ├── core/
    │   ├── guards/
    │   ├── interceptors/
    │   ├── services/
    │   └── api/
    │
    ├── shared/
    │   ├── components/
    │   │   ├── button/
    │   │   ├── product-card/
    │   │   ├── category-card/
    │   │   ├── feature-card/
    │   │   ├── section-header/
    │   │   ├── rating/
    │   │   ├── badge/
    │   │   ├── quantity-selector/
    │   │   ├── search-box/
    │   │   ├── pagination/
    │   │   ├── loader/
    │   │   └── empty-state/
    │   │
    │   ├── directives/
    │   ├── pipes/
    │   └── models/
    │
    ├── layouts/
    │   └── main-layout/
    │       ├── header/
    │       ├── footer/
    │       ├── mobile-menu/
    │       └── main-layout.ts
    │
    ├── features/
    │
    │   └── home/
    │       │
    │       ├── pages/
    │       │   └── home/
    │       │       ├── home.ts
    │       │       ├── home.html
    │       │       └── home.scss
    │       │
    │       ├── sections/
    │       │
    │       │   ├── hero/
    │       │   │   ├── hero.ts
    │       │   │   ├── hero.html
    │       │   │   └── hero.scss
    │       │   │
    │       │   ├── featured-categories/
    │       │   │   ├── featured-categories.ts
    │       │   │   ├── featured-categories.html
    │       │   │   └── featured-categories.scss
    │       │   │
    │       │   ├── featured-products/
    │       │   │   ├── featured-products.ts
    │       │   │   ├── featured-products.html
    │       │   │   └── featured-products.scss
    │       │   │
    │       │   ├── organic-food/
    │       │   │   ├── organic-food.ts
    │       │   │   ├── organic-food.html
    │       │   │   └── organic-food.scss
    │       │   │
    │       │   ├── sale-banner/
    │       │   │   ├── sale-banner.ts
    │       │   │   ├── sale-banner.html
    │       │   │   └── sale-banner.scss
    │       │   │
    │       │   ├── best-deals/
    │       │   │   ├── best-deals.ts
    │       │   │   ├── best-deals.html
    │       │   │   └── best-deals.scss
    │       │   │
    │       │   ├── service-features/
    │       │   │   ├── service-features.ts
    │       │   │   ├── service-features.html
    │       │   │   └── service-features.scss
    │       │   │
    │       │   └── newsletter/
    │       │       ├── newsletter.ts
    │       │       ├── newsletter.html
    │       │       └── newsletter.scss
    │       │
    │       ├── services/
    │       │   └── home.service.ts
    │       │
    │       ├── models/
    │       │   ├── banner.model.ts
    │       │   ├── category.model.ts
    │       │   └── product.model.ts
    │       │
    │       └── interfaces/
    │           ├── hero.interface.ts
    │           ├── category.interface.ts
    │           └── product.interface.ts
    │
    ├── app.routes.ts
    └── app.config.ts

---

# Folder Overview

## Core

The `core` folder contains application-wide services and configurations that are loaded once during the application lifecycle.

```
core/
├── guards/
├── interceptors/
├── services/
└── api/
```

### guards/

Contains Route Guards.

Example:

- Auth Guard
- Admin Guard
- Guest Guard

---

### interceptors/

Contains HTTP Interceptors.

Example:

- JWT Token Interceptor
- Error Interceptor
- Loading Interceptor

---

### services/

Contains singleton services shared across the application.

Example:

- AuthService
- StorageService
- ThemeService

---

### api/

Contains API endpoint definitions and API service classes.

Example:

- Product API
- Category API
- User API

---

# Shared

The `shared` folder contains reusable components, pipes, directives, and models that can be used across multiple features.

```
shared/
├── components/
├── directives/
├── pipes/
└── models/
```

---

## components/

Reusable UI Components.

```
components/
├── button/
├── product-card/
├── category-card/
├── section-title/
├── rating/
├── quantity-selector/
├── loader/
├── pagination/
├── search-box/
└── empty-state/
```

Example:

- Product Card
- Category Card
- Button
- Loader
- Search Box

These components should never contain business logic.

---

## directives/

Custom Angular Directives.

Example:

- Lazy Load
- Click Outside
- Autofocus

---

## pipes/

Reusable Angular Pipes.

Example:

- Currency Pipe
- Discount Pipe
- Date Pipe

---

## models/

Shared Interfaces and Types.

Example:

```
Product
Category
User
CartItem
```

---

# Layouts

Contains application layouts.

```
layouts/
└── main-layout/
```

Example:

```
main-layout/
├── header/
├── footer/
├── sidebar/
└── main-layout.ts
```

The layout is responsible for rendering:

- Header
- Footer
- Navigation
- Router Outlet

---

# Features

Each business module lives inside the `features` folder.

```
features/
├── home/
├── shop/
├── product/
├── cart/
├── wishlist/
├── checkout/
├── account/
└── not-found/
```

Each feature should be independent.

---

# Home Feature Structure

```
home/
├── pages/
├── sections/
├── services/
├── models/
└── interfaces/
```

---

## pages/

Contains page-level components.

```
pages/
└── home/
    ├── home.ts
    ├── home.html
    └── home.scss
```

The Home component only arranges sections.

Example:

```html
<app-hero></app-hero>

<app-featured-categories></app-featured-categories>

<app-featured-products></app-featured-products>

<app-organic-food></app-organic-food>

<app-sale-banner></app-sale-banner>

<app-weekly-deals></app-weekly-deals>

<app-newsletter></app-newsletter>
```

---

## sections/

Contains individual sections of the Home page.

```
sections/
├── hero/
├── featured-categories/
├── featured-products/
├── organic-food/
├── sale-banner/
├── weekly-deals/
├── newsletter/
└── testimonials/
```

Each section is an independent Angular component.

Example:

```
hero/
├── hero.ts
├── hero.html
└── hero.scss
```

---

## services/

Feature-specific services.

Example:

- HomeService

---

## models/

Feature-specific models.

Example:

```
Banner
HeroSlide
FeaturedProduct
```

---

## interfaces/

Feature-specific interfaces.

Example:

```ts
export interface HeroBanner {
  id: number;
  title: string;
  image: string;
}
```

---

# Shop Feature

Responsible for:

- Product Listing
- Filters
- Sorting
- Search
- Pagination

---

# Product Feature

Responsible for:

- Product Details
- Related Products
- Reviews
- Gallery

---

# Cart Feature

Responsible for:

- Cart Items
- Coupon
- Shipping
- Order Summary

---

# Wishlist Feature

Responsible for managing favorite products.

---

# Checkout Feature

Responsible for:

- Address
- Payment
- Order Review
- Confirmation

---

# Account Feature

Responsible for:

- Login
- Register
- Profile
- Orders
- Settings

---

# Not Found

Displays the 404 page.

---

# Best Practices

✅ Keep components small and reusable.

✅ Place reusable UI components inside `shared/components`.

✅ Keep business logic inside feature services.

✅ Avoid duplicating code.

✅ Keep layouts separate from features.

✅ Use standalone components whenever possible.

✅ Follow feature-based architecture.

---

# Example Home Page Architecture

```
Home Page
│
├── Hero
├── Featured Categories
│     └── Category Card (Shared)
│
├── Featured Products
│     └── Product Card (Shared)
│
├── Organic Food
├── Sale Banner
├── Weekly Deals
│     └── Product Card (Shared)
│
├── Newsletter
└── Footer
```

---

# Folder Responsibilities

| Folder | Responsibility |
|---------|----------------|
| `core` | Global services, guards, interceptors, API |
| `shared` | Reusable UI components, pipes, directives, models |
| `layouts` | Header, Footer, Sidebar, Layout components |
| `features` | Business modules (Home, Shop, Cart, Product, etc.) |
| `pages` | Route-level components |
| `sections` | Individual page sections |
| `services` | Feature-specific business logic |
| `models` | Data models |
| `interfaces` | TypeScript interfaces |

---

# Advantages

- ✔ Clean Architecture
- ✔ Feature-Based Structure
- ✔ Scalable
- ✔ Easy to Maintain
- ✔ Reusable Components
- ✔ Better Team Collaboration
- ✔ Easy Code Navigation
- ✔ Production Ready