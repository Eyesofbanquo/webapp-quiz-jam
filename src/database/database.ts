import * as Realm from "realm";

export class Database {
  /* 5. Adds inReview prop */
  public static readonly SCHEMA_VERSION = 5;

  realm(schema): Promise<Realm> {
    return Realm.open({
      schema: [schema],
      schemaVersion: Database.SCHEMA_VERSION,
    });
  }
}
