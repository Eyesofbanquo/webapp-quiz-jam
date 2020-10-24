import * as Realm from "realm";
import pool from "./pool";

export interface Storeable {
  realm: (any) => Promise<Realm>;
}

/**
 * Database
 * * This class is used to give central access to the underlying Realm object.
 */
export class Database implements Storeable {
  /* 7.  Add uuid to question objects */
  /* 6. Adds name prop */
  /* 5. Adds inReview prop */
  public static readonly SCHEMA_VERSION = 7;

  realm(schema): Promise<Realm> {
    return Realm.open({
      schema: [schema],
      schemaVersion: Database.SCHEMA_VERSION,
      migration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < 7) {
          const oldObjects = newRealm.objects("MultipleChoice");
          newRealm.delete(oldObjects);
        }
      },
    });
  }
}
