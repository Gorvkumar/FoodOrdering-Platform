const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("authtoken", token);

  res.status(201).json({
    message: "user registered sucessfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("authtoken", token);

  res.status(200).json({
    message: "User logged in sucessfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

function logoutUser(req, res) {
  res.clearCookie("authtoken");
  res.status(200).json({
    message: "user logged out sucessfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;

  const isfoodPartnerAlreadyExist = await foodPartnerModel.findOne({
    email,
  });

  if (isfoodPartnerAlreadyExist) {
    return res.status(400).json({
      message: "Food partner account already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("authtoken", token);

  return res.status(201).json({
    message: "Food partner registered sucessfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner.id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("authtoken", token);

  res.status(200).json({
    message: "User logged in sucessfully",
    user: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("authtoken");
  res.status(200).json({
    message: "FoodPartner logged out Sucessfully",
  });
}

async function verifyToken(req, res) {
  const token = req.cookies.authtoken;

  if (!token) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Try to find user first
    let user = await userModel.findById(decoded.id).select("-password");

    if (user) {
      return res.status(200).json({
        message: "Authenticated",
        user: {
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
      });
    }

    // If not a user, try food partner
    let foodPartner = await foodPartnerModel
      .findById(decoded.id)
      .select("-password");

    if (foodPartner) {
      return res.status(200).json({
        message: "Authenticated",
        user: {
          _id: foodPartner._id,
          email: foodPartner.email,
          fullName: foodPartner.name,
        },
      });
    }

    return res.status(401).json({
      message: "User not found",
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  verifyToken,
};
