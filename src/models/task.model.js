const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: [120, "Title cannot be longer than 120 characters."]
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

taskSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model("Task", taskSchema);

