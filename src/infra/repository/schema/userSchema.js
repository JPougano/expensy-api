module.exports = ({ mongoose }) => {
  const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
  });

  const UserModel = mongoose.model("User", userSchema);
  return UserModel;
};