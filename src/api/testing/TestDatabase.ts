import * as Realm from "realm";
import { Storeable } from "../../database/database";

export class TestDatabase implements Storeable {
  realm(schema): Promise<Realm> {
    return Realm.open({
      path: "test.realm",
      schema: [schema],
    });
  }
}
