# EliteFit Indoor Sports Backend

Backend for EliteFit Indoor Sports, built with Node.js, Express, Apollo Server (GraphQL), TypeScript, and PostgreSQL (via Prisma ORM).

## Features

- Express server
- Apollo Server (GraphQL API)
- PostgreSQL database (via Prisma ORM)
- TypeScript type safety
- Modular folder structure

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Setup your .env file**  
   Copy `.env.example` to `.env` and fill in your database credentials.

3. **Run migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start in development mode**
   ```bash
   npm run dev
   ```

## Folder Structure

```
src/
  index.ts           # Entry point
  schema/
    typeDefs.ts      # GraphQL type definitions
    resolvers.ts     # GraphQL resolvers
  models/
    User.ts          # Example User model
  services/
    db.ts            # Prisma client
    auth.ts          # Auth logic placeholder
prisma/
  schema.prisma      # Prisma DB schema
.env.example         # Example environment variables
tsconfig.json
package.json
.gitignore
README.md
```