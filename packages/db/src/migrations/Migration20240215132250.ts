import { Migration } from "@mikro-orm/migrations"

export class Migration20240215132250 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "category" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null, "description" varchar(255) not null, constraint "category_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "product" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null, "description" varchar(255) not null, "stock" int not null, "price" int not null, constraint "product_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "category_products" ("category_id" uuid not null, "product_id" uuid not null, constraint "category_products_pkey" primary key ("category_id", "product_id"));',
    )

    this.addSql(
      'create table "user" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "full_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "bio" text not null default \'\', "birthdate" date not null, constraint "user_pkey" primary key ("id"));',
    )

    this.addSql(
      'alter table "category_products" add constraint "category_products_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;',
    )
    this.addSql(
      'alter table "category_products" add constraint "category_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "category_products" drop constraint "category_products_category_id_foreign";',
    )

    this.addSql(
      'alter table "category_products" drop constraint "category_products_product_id_foreign";',
    )

    this.addSql('drop table if exists "category" cascade;')

    this.addSql('drop table if exists "product" cascade;')

    this.addSql('drop table if exists "category_products" cascade;')

    this.addSql('drop table if exists "user" cascade;')
  }
}
