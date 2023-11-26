const Med = require("./../models/medInfoModel");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const CatchAsync = require("./../utils/catchAsync");

exports.submitMedicals = CatchAsync(async (req, res, next) => {
  try {
    // Get the user ID from the request parameters or wherever it is available
    const userId = req.query.userId || req.body.userId || req.user.id;

    // Find the user
    const user = await User.findById(userId);
    // console.log(user);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      bloodPressure,
      allergies,
      smoker,
    } = req.body;

    const newMed = await Med.create({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      bloodPressure,
      allergies,
      smoker,
      user: user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        data: newMed,
      },
    });
  } catch (error) {
    console.error(error._message); // Log the general validation error message

    if (error.errors) {
      // Log detailed information about validation errors
      console.error("Validation Errors:", error.errors);
    }

    return next(new AppError("Error creating medical record!", 400));
  }
});
