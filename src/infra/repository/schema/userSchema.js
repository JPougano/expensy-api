const bcrypt = require('bcrypt');

module.exports = ({ mongoose, logger }) => {
  const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "username is required"],
        unique: true
      },
      email: {
        type: String,
        required: [true, "email is required"],
        unique: true
      },
      password: {
        type: String,
        required: [true, "password is required"]
      },
    },
    { timestamps: true }
  );
  
  userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  userSchema.methods.comparePassword = async function (password) {
    logger.info(JSON.stringify({
      password,
      thisPass: this.password
    }))
    return bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('User', userSchema);
  
  
  return User;
};
