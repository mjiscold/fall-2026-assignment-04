---
name: kysely-migration-generator
description: >
  Generate type-safe Kysely database migrations from Mermaid ERD files
  when the user asks to translate an ERD, schema, or data model into
  a Kysely migration.
---

# Kysely Migration Generator

When this skill is triggered, follow these rules.

## 1. Read the ERD

Read the Mermaid ERD from:

docs/architecture/schema.mmd

Use the existing migration:

src/db/migrations/001_initial_schema.ts

as the reference for project conventions and migration structure.

## 2. Entities to Tables

Convert Mermaid entity names to snake_case table names.

Examples:

USERS -> users
BOOK_AUTHORS -> book_authors
LOAN_ITEMS -> loan_items

## 3. Primary Keys

Convert Mermaid attributes marked `PK` into primary key columns.

Follow the ID strategy used by the existing project migration.

Use auto-generating IDs or UUIDs where appropriate.

Do not recreate tables that already exist in the starter schema.

## 4. Foreign Keys

Convert Mermaid attributes marked `FK` into Kysely foreign key columns.

Use references and cascading deletes where appropriate.

Example:

.addColumn('user_id', 'uuid', (col) =>
  col.notNull()
    .references('users.id')
    .onDelete('cascade')
)

## 5. Cardinalities

For one-to-many relationships such as:

PARENT ||--o{ CHILD

place the foreign key on the CHILD table.

For one-to-one relationships such as:

A ||--o| B

use a foreign key with a unique constraint.

For many-to-many relationships, create a join table.

## 6. Migration Output

Write the generated migration to:

src/db/migrations/<timestamp>_<migration_name>.ts

The migration must export both:

```ts
export async function up(db: Kysely<any>): Promise<void> {
  // create tables
}

export async function down(db: Kysely<any>): Promise<void> {
  // drop tables
}