import { Migration } from "@mikro-orm/migrations"

export class Migration20240424072635 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "products" add column "slug" text;')
    this.addSql(
      `update "products" set "slug" = lower(replace("name"->>'en', ' ', '-'));`,
    )
    this.addSql(
      'alter table "products" alter column "slug" set not null, add constraint "products_slug_unique" unique ("slug");',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_slug_unique";',
    )
    this.addSql('alter table "products" drop column "slug";')
  }
}
