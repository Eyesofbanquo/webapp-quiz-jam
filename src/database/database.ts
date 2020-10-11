import * as Realm from "realm";

export class Database {
  public static readonly SCHEMA_VERSION = 3;

  realm(schema): Promise<Realm> {
    return Realm.open({
      schema: [schema],
      schemaVersion: Database.SCHEMA_VERSION,
    });
  }
}
