# Uzel
Учебный проект: система регистрации и авторизации с JWT (access + refresh токены), списком пользователей и профилем. Бэкенд на Express + Prisma, фронтенд на React + Redux Toolkit.

## Стек

**Бэкенд**
- Node.js + TypeScript
- Express
- Prisma ORM + SQLite
- JWT (jsonwebtoken)
- bcryptjs

**Фронтенд**
- React + TypeScript
- Redux Toolkit
- React Router
- Axios
- SCSS Modules (БЭМ)

## Возможности

- Регистрация и вход по email/паролю
- Access-токен (15 мин) в памяти + refresh-токен (7 дней) в HttpOnly-cookie
- Автоматическое обновление access-токена через axios-интерцептор
- Восстановление сессии при перезагрузке страницы (`/auth/me`)
- Список пользователей с пагинацией
- Страница профиля
- Защищённые маршруты (redirect на `/login`, если не авторизован)

## Структура проекта

```
├── server/                 # бэкенд
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── lib/
│   │   └── index.ts
│   └── .env
│
└── client/                 # фронтенд
    └── src/
        ├── App/             # store, api, роутинг
        ├── Entities/        # бизнес-сущности (Auth, Users)
        ├── Pages/           # страницы
        ├── shared/UI/       # переиспользуемые компоненты
        └── widgets/         # композиции из компонентов (Header и т.д.)
```

## Установка и запуск

### 1. Клонирование

```bash
git clone https://github.com/aRsenToim/Uzel-JWT
cd uzel
```

### 2. Бэкенд

```bash
cd server
npm install
```

Создайте `.env` в папке `server` по образцу `.env.example`:

```env
DATABASE_URL="file:./dev.db"
PORT=3003
CLIENT_URL="http://localhost:5173"

JWT_ACCESS_SECRET="jwt-access-lerochka"
JWT_REFRESH_SECRET="jwt-refresh-lerochka"

JWT_REFRESH_TTL_SECONDS=604800
JWT_ACCESS_TTL_SECONDS=900
```

Секреты сгенерировать так (запустить дважды для двух разных значений):

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Применить миграции и сгенерировать клиент:

```bash
npx prisma migrate dev
npx prisma generate
```

Запуск:

```bash
npm run dev
```

Сервер поднимется на `http://localhost:3003`.

### 3. Фронтенд

```bash
cd client
npm install
```

Создайте `.env`:

```env
VITE_API_URL=http://localhost:3003/api/
```

Запуск:

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:5173`.
