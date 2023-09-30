import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput{
    email: string;
    password: string;
    name: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024 
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

// pre-save hook to hash the password before saving the user model to the database.
userSchema.pre<UserDocument>('save', async function (next) {
    let user = this as UserDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

// comparePassword is used to compare the password entered by the user with the hashed password stored in the database.
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

