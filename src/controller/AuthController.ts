import { MongoEntityManager, getMongoManager } from "typeorm";
import { User } from "../entity/User";

export class AuthController {
  entityManager: MongoEntityManager;

  constructor() {
    this.entityManager = getMongoManager();
  }

  async registerUser(user: User): Promise<User> {
    console.log(user._password);
    delete user._password;

    try {
      const savedUser = await this.entityManager.save(user);
      return savedUser;
    } catch (error) {
      console.log(error);
    }
  }
}
