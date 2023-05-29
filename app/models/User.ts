import { db } from "../firebase";

export default class User {
  private static path = "users";

  public id?: string;
  public name: string;
  public email: string;
  public password?: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  public static collection = db.collection(this.path);

  public static async create(user: User) {
    try {
      const ref = await db.collection(this.path).add(user);

      return ref;
    } catch (e) {
      throw e;
    }
  }

  public static async find() {
    try {
      const result: User[] = [];
      const snapShot = await db.collection(this.path).get();

      snapShot.forEach((doc) => {
        result.push({ id: doc.id, ...(doc.data() as User) });
      });

      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
