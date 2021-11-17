import mongoose from "mongoose";

const announceSchema = mongoose.Schema(
  {
    announcement: {
      type: String,
      require: true,
      maxLength: 50,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announceSchema);
