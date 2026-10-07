import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('genres')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('description', 'text')
    .execute();

  await db.schema
    .createTable('authors')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('bio', 'text')
    .execute();

  await db.schema
    .createTable('borrowers')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) =>
      col.notNull().unique().references('users.id').onDelete('cascade')
    )
    .addColumn('phone', 'varchar(255)')
    .addColumn('membership_status', 'varchar(255)')
    .execute();

  await db.schema
    .createTable('books')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('genre_id', 'integer', (col) =>
      col.notNull().references('genres.id').onDelete('cascade')
    )
    .addColumn('title', 'varchar(255)', (col) => col.notNull())
    .addColumn('isbn', 'varchar(255)')
    .addColumn('published_year', 'integer')
    .execute();

  await db.schema
    .createTable('book_authors')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('book_id', 'integer', (col) =>
      col.notNull().references('books.id').onDelete('cascade')
    )
    .addColumn('author_id', 'integer', (col) =>
      col.notNull().references('authors.id').onDelete('cascade')
    )
    .execute();

  await db.schema
    .createTable('loans')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('borrower_id', 'integer', (col) =>
      col.notNull().references('borrowers.id').onDelete('cascade')
    )
    .addColumn('book_id', 'integer', (col) =>
      col.notNull().references('books.id').onDelete('cascade')
    )
    .addColumn('borrowed_at', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull()
    )
    .addColumn('due_at', 'timestamp')
    .addColumn('returned_at', 'timestamp')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('loans').execute();
  await db.schema.dropTable('book_authors').execute();
  await db.schema.dropTable('books').execute();
  await db.schema.dropTable('borrowers').execute();
  await db.schema.dropTable('authors').execute();
  await db.schema.dropTable('genres').execute();
}
