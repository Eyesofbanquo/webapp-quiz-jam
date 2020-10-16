import * as Realm from "realm";

export class Database {
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
