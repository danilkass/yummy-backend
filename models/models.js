import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    youtubeUrl: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema", // Связь с моделью Users
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const IngredientSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostSchema", // Связь с моделью Post
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});
const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema", // Связь с моделью UserSchema
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostSchema", // Связь с моделью PostSchema
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentReactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema", // Связь с моделью UserSchema
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommentSchema", // Связь с моделью CommentSchema
    required: true,
  },
  reaction: {
    type: Boolean,
    required: true,
  },
});
const UserSaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema", // Связь с моделью UserSchema
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostSchema", // Связь с моделью PostSchema
    required: true,
  },
});
const PostReactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema", // Связь с моделью Users
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostSchema", // Связь с моделью Comment
    required: true,
  },
  reaction: {
    type: Boolean,
    required: true,
  },
});
const SubscriberSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  userid: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
export const Post = mongoose.model("Post", PostSchema);
export const Ingredient = mongoose.model("Ingredient", IngredientSchema);
export const Comment = mongoose.model("Comment", CommentSchema);
export const CommentReaction = mongoose.model("CommentReaction", CommentReactionSchema);
export const UserSave = mongoose.model("UserSave", UserSaveSchema);
export const PostReaction = mongoose.model("PostReaction", PostReactionSchema);
export const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
