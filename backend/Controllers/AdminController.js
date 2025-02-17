const User = require("../Models/User");
const jwt = require("jsonwebtoken");
module.exports = {
  async Signup(req, res) {
    try {
      const user = new User(req.body);
      const emailRegex = /^(?:[a-zA-Z0-9]+@(gmail\.com|proton\.me))$/;

      if (user.email && !emailRegex.test(user.email)) {
        return res.status(300).json({ message: "Invalid email" });
      }
      const result = await user.save();

      res.status(200).json({ message: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async Logout(req, res) {
    res.clearCookie("admin", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  },

  async Login(req, res) {
    try {
      const { email, password } = req.body;

      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const secret = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });
        res.cookie("admin", secret, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 36000000,
        });

        return res.status(200).json({ message: "Login Successfully" });
      }

      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async GetUsers(req, res) {
    const users = await User.find();
    return res.status(200).json(users);
  },

  async SearchUser(req, res) {
    const { username, email, country, gender } = req.body;
    if (!username && !email && !country && !gender) {
      return res.status(202).json("Nothing to Search");
    }

    const filter = {};
    if (username) {
      filter.username = { $regex: new RegExp(username, "i") };
    }
    if (email) {
      filter.email = { $regex: new RegExp(email, "i") };
    }
    if (country) {
      filter.country = { $regex: new RegExp(country, "i") };
    }
    if (gender) {
      filter.gender = gender;
    }

    try {
      const users = await User.find(filter);
      if (users == null) {
        return res.status(300).json("No User Found");
      }
      console.log("Found users:", users);
      return res.status(200).json(users);
    } catch (error) {
      console.log("Error");
      return res.status(500).json({ message: "Server error" });
    }
  },

  async DeleteUser(req, res) {
    const user_id = req.params.id;
    const response = await User.findByIdAndDelete(user_id);
    if (!response) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json({ message: "Account Deleted" });
  },

  async UpdateUser(req, res) {
    const user_id = req.params.id;
    const { username, email, country, gender } = req.body;

    try {
      const emailRegex = /^(?:[a-zA-Z0-9]+@(gmail\.com|proton\.me))$/;

      if (email && !emailRegex.test(email)) {
        return res.status(300).json({ message: "Invalid email" });
      }
      const user = User.find(user_id);

      const updatedData = {
        username: username || user.username,
        email: email || user.email,
        country: country || user.country,
        gender: gender || user.gender,
      };
      await User.findByIdAndUpdate(user_id, updatedData);
      const updatedUser = await User.find();
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Update Failed", error: error });
    }
  },

  async UpdatePicture(req, res) {
    const profile = req.file;
    const user_id = req.params.id;
    // try {
    const user = await User.findById(user_id);
    if (!user) {
      console.log("here");
      return res.status(500).json("User Not Found");
    }
    const normalizedPath = profile.path.replace(/\\/g, "/");
    await User.findByIdAndUpdate(user_id, {
      profile: `http://localhost:5000/${normalizedPath}`,
    });

    console.log("pic = ", profile);
    return res.status(200).json("lvl");

  },

  async GetSingleUser(req, res) {
    const user_id = req.params.id;
    try {
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "No User Matched This ID" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },

  async Stats(req, res) {
    const total_user = await User.countDocuments();
    console.log(total_user);

    res.json(total_user);
  },

  async AdminStatus(req, res) {
    const token = req.cookies.admin;
    try {
      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json(error, error);
    }
  },
};
