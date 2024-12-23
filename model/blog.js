const { type } = require("express/lib/response");
const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      require: true,
    },
    coverImageURl: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
const Blog = model("blog", blogSchema);

module.exports = Blog;
