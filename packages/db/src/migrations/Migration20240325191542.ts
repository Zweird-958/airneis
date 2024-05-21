import { Migration } from "@mikro-orm/migrations"

export class Migration20240325191542 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "users" add column "is_active" boolean not null default false;',
    )
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "is_active";')
  }
}
