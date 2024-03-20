import mongoose from "mongoose";
import passport from "passport";
import findOrCreate from "mongoose-findorcreate";

const schema = mongoose.Schema;

const userSchema = new schema({
    id: { type: String },
    user: { type: String, required: true },
    name_role_timestamp: {
        type: String,
        enum: [ "Retail BAP", "Retail BPP" ]
    },
    name_org: { type: String },
    agree: { type: Boolean },
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