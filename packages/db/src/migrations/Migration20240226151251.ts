import { Migration } from "@mikro-orm/migrations"

export class Migration20240226151251 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "delivery_countries" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" text not null, "vat" real not null, constraint "delivery_countries_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "delivery_countries" add constraint "delivery_countries_name_unique" unique ("name");',
    )

    this.addSql(
      'create table "images" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "url" text not null, constraint "images_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "categories" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" jsonb not null, "description" jsonb not null, "image_id" uuid not null, constraint "categories_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "categories" add constraint "categories_name_unique" unique ("name");',
    )

    this.addSql(
      'create table "materials" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" jsonb not null, constraint "materials_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "materials" add constraint "materials_name_unique" unique ("name");',
    )

    this.addSql(
      'create table "messages" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "email" text not null, "subject" text not null, "description" text not null, constraint "messages_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "products" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, "name" jsonb not null, "description" jsonb not null, "stock" int not null, "price" int not null, constraint "products_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "link_materials_products" ("material_id" uuid not null, "product_id" uuid not null, constraint "link_materials_products_pkey" primary key ("material_id", "product_id"));',
    )

    this.addSql(
      'create table "link_images_products" ("product_id" uuid not null, "image_id" uuid not null, constraint "link_images_products_pkey" primary key ("product_id", "image_id"));',
    )

    this.addSql(
      'create table "link_categories_products" ("category_id" uuid not null, "product_id" uuid not null, constraint "link_categories_products_pkey" primary key ("category_id", "product_id"));',
    )

    this.addSql(
      'create table "users" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, "first_name" text not null, "last_name" text not null, "email" text not null, "password" text not null, constraint "users_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    )

    this.addSql(
      'create table "carts" ("user_id" uuid not null, "product_id" uuid not null, "quantity" int not null, constraint "carts_pkey" primary key ("user_id", "product_id"));',
    )

    this.addSql(
      'create table "addresses" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, "full_name" text not null, "address" text not null, "postal_code" text not null, "city" text not null, "phone_number" text null, "is_favorite" boolean not null default false, "country_id" uuid not null, "user_id" uuid not null, constraint "addresses_pkey" primary key ("id"));',
    )

    this.addSql(
      "create type \"order_status\" as enum ('CANCELLED', 'ONGOING', 'DELIVERED');",
    )
    this.addSql(
      'create table "orders" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "status" "order_status" not null, "total" int not null, "vat" real not null, "delivery_address_id" uuid not null, "billing_address_id" uuid not null, "user_id" uuid not null, constraint "orders_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "link_orders_products" ("order_id" uuid not null, "product_id" uuid not null, "price_unit" int not null, "quantity" int not null, constraint "link_orders_products_pkey" primary key ("order_id", "product_id"));',
    )

    this.addSql(
      'alter table "categories" add constraint "categories_image_id_foreign" foreign key ("image_id") references "images" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "link_materials_products" add constraint "link_materials_products_material_id_foreign" foreign key ("material_id") references "materials" ("id") on update cascade on delete cascade;',
    )
    this.addSql(
      'alter table "link_materials_products" add constraint "link_materials_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete cascade;',
    )

    this.addSql(
      'alter table "link_images_products" add constraint "link_images_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete cascade;',
    )
    this.addSql(
      'alter table "link_images_products" add constraint "link_images_products_image_id_foreign" foreign key ("image_id") references "images" ("id") on update cascade on delete cascade;',
    )

    this.addSql(
      'alter table "link_categories_products" add constraint "link_categories_products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete cascade;',
    )
    this.addSql(
      'alter table "link_categories_products" add constraint "link_categories_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete cascade;',
    )

    this.addSql(
      'alter table "carts" add constraint "carts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "carts" add constraint "carts_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "addresses" add constraint "addresses_country_id_foreign" foreign key ("country_id") references "delivery_countries" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "addresses" add constraint "addresses_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "orders" add constraint "orders_delivery_address_id_foreign" foreign key ("delivery_address_id") references "addresses" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "orders" add constraint "orders_billing_address_id_foreign" foreign key ("billing_address_id") references "addresses" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "link_orders_products" add constraint "link_orders_products_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "link_orders_products" add constraint "link_orders_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "addresses" drop constraint "addresses_country_id_foreign";',
    )

    this.addSql(
      'alter table "categories" drop constraint "categories_image_id_foreign";',
    )

    this.addSql(
      'alter table "link_images_products" drop constraint "link_images_products_image_id_foreign";',
    )

    this.addSql(
      'alter table "link_categories_products" drop constraint "link_categories_products_category_id_foreign";',
    )

    this.addSql(
      'alter table "link_materials_products" drop constraint "link_materials_products_material_id_foreign";',
    )

    this.addSql(
      'alter table "link_materials_products" drop constraint "link_materials_products_product_id_foreign";',
    )

    this.addSql(
      'alter table "link_images_products" drop constraint "link_images_products_product_id_foreign";',
    )

    this.addSql(
      'alter table "link_categories_products" drop constraint "link_categories_products_product_id_foreign";',
    )

    this.addSql(
      'alter table "carts" drop constraint "carts_product_id_foreign";',
    )

    this.addSql(
      'alter table "link_orders_products" drop constraint "link_orders_products_product_id_foreign";',
    )

    this.addSql('alter table "carts" drop constraint "carts_user_id_foreign";')

    this.addSql(
      'alter table "addresses" drop constraint "addresses_user_id_foreign";',
    )

    this.addSql(
      'alter table "orders" drop constraint "orders_user_id_foreign";',
    )

    this.addSql(
      'alter table "orders" drop constraint "orders_delivery_address_id_foreign";',
    )

    this.addSql(
      'alter table "orders" drop constraint "orders_billing_address_id_foreign";',
    )

    this.addSql(
      'alter table "link_orders_products" drop constraint "link_orders_products_order_id_foreign";',
    )

    this.addSql('drop table if exists "delivery_countries" cascade;')

    this.addSql('drop table if exists "images" cascade;')

    this.addSql('drop table if exists "categories" cascade;')

    this.addSql('drop table if exists "materials" cascade;')

    this.addSql('drop table if exists "messages" cascade;')

    this.addSql('drop table if exists "products" cascade;')

    this.addSql('drop table if exists "link_materials_products" cascade;')

    this.addSql('drop table if exists "link_images_products" cascade;')

    this.addSql('drop table if exists "link_categories_products" cascade;')

    this.addSql('drop table if exists "users" cascade;')

    this.addSql('drop table if exists "carts" cascade;')

    this.addSql('drop table if exists "addresses" cascade;')

    this.addSql('drop table if exists "orders" cascade;')

    this.addSql('drop table if exists "link_orders_products" cascade;')

    this.addSql('drop type "order_status";')
  }
}
