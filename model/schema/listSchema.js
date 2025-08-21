const mongoose = require("mongoose")

const listSchema = new mongoose.Schema(
  {
    items: [
      {
        firstname: {
          type: String,
          required: true,
          trim: true,
        },
        mobile: {
          type: String,
          required: true,
        },
        notes: {
          type: String,
          default: "",
        },
      },
    ],
    uploadedBy: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("list", listSchema);
