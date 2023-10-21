module.exports = ({ mongoose }) => {
  const userSchema = mongoose.Schema({
    username: {
      type: String,
      min: 3,
      max: 255,
      required: true,
    },
    email: {
      type: String,
      min: 6,
      max: 255,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 1024,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });

  const UserModel = mongoose.model("User", userSchema);
  return UserModel;
};
