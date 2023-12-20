import { model } from "mongoose";
import { Schema, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Surel telah terdaftar!"],
        required: [true, "Surel diperlukan!"],
    },
    username: {
        type: String,
        required: [true, "Nama Pengguna diperlukan"],
        match: [
            /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it should contain 6-20 alphanumeric letters and be unique!",
        ],
    },
    image: {
        type: String,
    },
})

const User = models.User || model("User", UserSchema);

export default User