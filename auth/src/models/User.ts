import { PasswordManager } from "../helpers/PasswordManager";
import mongoose from "mongoose";

// an interface that describes the properties needed to make
// a new user
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes properties User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes what a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // we use this to transform the json representation of the model
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//! We don't use an arrow function here because we want this to refer to the User object
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    //> isModified will return true the first time the user is made
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
