import { Migration } from '@mikro-orm/migrations';

export class Migration20240521122518 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contacts" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "email" text not null, "subject" text not null, "description" text not null, constraint "contacts_pkey" primary key ("id"));');

    this.addSql('drop table if exists "contact" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "contact" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "email" text not null, "subject" text not null, "description" text not null, constraint "contact_pkey" primary key ("id"));');

    this.addSql('drop table if exists "contacts" cascade;');
  }

}
