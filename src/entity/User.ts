import { pbkdf2Sync, randomBytes } from "crypto";
import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { validate } from "email-validator";

export enum STATUS {
  INVALID_EMAIL = "Invalid e-mail",
  INVALID_NAME = "Invalid name",
  INVALID_PASSWORD = "The password must contain at least 8 characters, 1 uppercase character",
  OK = "OK",
  REGISTER_ERROR = "An error occurred while trying to register the user",
}

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  _password: string;

  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this._password = password;
    this._generatePassword();
  }

  // User Validate

  isValid(): STATUS {
    if (!validate(this.email)) {
      return STATUS.INVALID_EMAIL;
    }

    if (!this.name || this.name.length == 0) {
      return STATUS.INVALID_NAME;
    }

    if (!this._isPasswordValid()) {
      return STATUS.INVALID_PASSWORD;
    }
  }

  // Second validate password

  isPasswordCorrect(password: string): boolean {
    let hash = pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString(
      "hex"
    );
    return hash == this.hash;
  }

  // Generate password

  private _generatePassword() {
    if (this._isPasswordValid()) {
      let salt = randomBytes(16).toString("hex");
      let hash = pbkdf2Sync(this._password, salt, 1000, 64, "sha512").toString(
        "hex"
      );
      console.log(hash);
      this.salt = salt;
      this.hash = hash;
    }
  }

  // Validade password

  private _isPasswordValid(): boolean {
    return (
      this._password.length >= 8 &&
      /[A-Z]/g.test(this._password) &&
      /[0-9]/g.test(this._password)
    );
  }
}
