const mongoose = require("mongoose");

const medSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your first name!"],
    trim: true,
    maxlength: [20, "First name must have 20 characters or fewer"],
    minlength: [2, "First name must have 2 characters or more"],
  },

  lastName: {
    type: String,
    required: [true, "Please tell us your last name!"],
    maxlength: [20, "Last name must have 20 characters or fewer"],
    minlength: [2, "Last name must have 2 characters or more"],
  },

  gender: {
    type: String,
    required: [true, "Please specify your gender!"],
  },

  dateOfBirth: {
    type: String,
    required: [true, "Please provide date of birth!"],
  },

  bloodPressure: {
    type: String,
    required: [true, "Please share your blood pressure history!"],
  },

  allergies: {
    type: String,
    required: [true, "Please tell us about your allergies!"],
  },

  smoker: {
    type: String,
    required: [true, "Please select an option for smoking!"],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Medical info must have a user"],
  },
});

// Middleware
medSchema.pre("save", function (next) {
  const requiredFields = [
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "bloodPressure",
    "allergies",
    "smoker",
  ];

  const filledFields = requiredFields.filter((field) => this[field]);

  // Update progress based on the percentage of filled fields
  this.progress = (filledFields.length / requiredFields.length) * 100;

  next();
});

//  Trim and format the allergies string to ensure consistency
medSchema.pre("save", function (next) {
  if (this.allergies) {
    this.allergies = this.allergies.trim();
  }
  next();
});

// Compound index (one user can't have multiple medical info)
medSchema.index({ user: 1 }, { unique: true });

const Med = mongoose.model("Med", medSchema);

module.exports = Med;
