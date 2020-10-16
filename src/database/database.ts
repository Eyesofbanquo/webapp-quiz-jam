import * as Realm from "realm";

export class Database {
  /* 6. Adds name prop */
  /* 5. Adds inReview prop */
  public static readonly SCHEMA_VERSION = 6;

  realm(schema): Promise<Realm> {
    return Realm.open({
      schema: [schema],
      schemaVersion: Database.SCHEMA_VERSION,
    });
  }
}
