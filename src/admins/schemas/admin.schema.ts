import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, default: null },
        email: { type: String, required: true, unique: true },
        password: { type: String, default: null },
        dateOfBirth: { type: Date, default: null },
    },
    { timestamps: true },    
)

AdminSchema.pre('save', function(next) {
    let admin = this;

    if (!admin.isModified('password')) return next();

    if (!admin.password) return next();

    bcrypt.genSalt(11, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(admin.password, salt, function(err, hash) {
            if(err) return next(err);

            admin.password = hash;
            next();
        })
    });

});

AdminSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, valid) {
        if (err) return cb(err);
        cb(null, valid);
    });
};

export { AdminSchema };