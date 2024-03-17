import { Migration } from "@mikro-orm/migrations"

export class Migration20240313150535 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "categories" add column "slug" text not null;')
    this.addSql(
      'alter table "categories" add constraint "categories_slug_unique" unique ("slug");',
    )

    this.addSql('alter table "products" add column "priority" int null;')
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "categories" drop constraint "categories_slug_unique";',
    )
    this.addSql('alter table "categories" drop column "slug";')

    this.addSql('alter table "products" drop column "priority";')
  }
}
