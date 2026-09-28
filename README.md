# B2B Sales & Product Management Platform

Milestone 1 foundation for the B2B sales operating system.

## Current stack
- Angular 19 + TypeScript
- Spring Boot 4 + Java 21
- MySQL 8.4
- Docker + Docker Compose

## Run locally without Docker
### Backend
```bash
cd b2b-platform
./mvnw spring-boot:run
```

### Frontend
```bash
cd b2b-platform-ui
npm install
npm start
```

Open http://localhost:4200

## Run with Docker
From this directory:
```bash
docker compose up --build
```

- UI: http://localhost:4200
- API health: http://localhost:8080/api/health
- MySQL: localhost:3306

## Next implementation
Product Management will be built end-to-end: MySQL schema -> JPA entity/DTO/repository/service/controller -> Angular service/model/pages -> validation/search/pagination -> tests.

## Milestone 2 — Product Management

Implemented the first end-to-end slice:
- Category and brand lookup tables
- Product entity and MySQL relationships
- Product REST CRUD API
- Search, category/brand filters and pagination
- Angular product list
- Angular add/edit product form
- Delete product
- Seed categories and brands for local development

API base: `http://localhost:8080/api/products`

## Run locally

1. Start MySQL: `docker compose up -d mysql`
2. Start the Spring Boot API from `b2b-platform`: `./mvnw spring-boot:run`
3. Start Angular from `b2b-platform-ui`: `npm install` then `npm start`
4. Open `http://localhost:4200/products`

The API creates/updates the product tables using JPA `ddl-auto=update` for this learning phase. The SQL file under `database/001_products.sql` is included as the explicit schema reference. Later, when we introduce production engineering, we will replace automatic schema updates with database migrations.
