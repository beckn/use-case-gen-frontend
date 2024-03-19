import mongoose from "mongoose";
import passport from "passport";
import findOrCreate from "mongoose-findorcreate";

const schema = mongoose.Schema;

const userSchema = new schema({
    // mobile: { type: Number, required: true, unique: true },
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    // password: { type: String, required: true },
    // role: {
    //     type: String,
    //     enum: [ "Retail BAP", "Retail BPP" ],
    //     default: "Retail BPP",
    // },
    // organisation_name: { type: String, required: true },
});

userSchema.plugin(findOrCreate);

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

export default mongoose.model('User', userSchema);