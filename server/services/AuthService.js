const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("config");

//Services
const UserService = require("./UserService");
const userService = new UserService();
const EmailService = require("./EmailService");
const UserHistoryService = require("./UserHistoryService");

//Models
const User = require("../models/User");
const Role = require("../models/Roles");
const ConfirmationEmail = require("../models/ConfirmationEmail");

class AuthService {
  constructor() {}

  async confirmAccount(token) {
    try {
      //need to match the url with the token in the db
      //bring up the item, they should have the user's email, id
      console.log("token is this: ", token);
      let confirmationEmail = await ConfirmationEmail.findOne(token);
      console.log("confirmaitonEmail", confirmationEmail);
      let email = confirmationEmail.email;
      let user = await User.findOne({ email });
      console.log("user", user);
      user.verified = true;

      //sign in
      await user.save();
      await confirmationEmail.delete();
      const payload = {
        user: {
          id: user.id,
        },
      };
      console.log("got this far!");
      return payload;
    } catch (err) {
      console.log("err srevice", err.message);
    }
  }

  async login(userArgs) {
    try {
      const { email, password } = userArgs;
      const errorArgs = {
        status: 400,
        errors: [{ msg: "Invalid Credentials" }],
      };
      let user = await User.findOne({ email });
      if (!user) {
        console.log(email, userArgs, "no user  found makes no snese");
        return errorArgs;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return errorArgs;
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      return payload;
    } catch (err) {
      return { status: 500, Message: "login failed" };
    }
  }

  /*Create User*/
  async register(newUserRequestArgs) {
    try {
      let user = await User.findOne({ email: newUserRequestArgs.email });
      if (user) {
        user.Status = "FAILED";
        user.Message = "A User with the same email already exists";
        return user;
      }
      let { id, email, name, password } = newUserRequestArgs;
      const userFields = { id, email, name, password };
      userFields.id = uuid.v4();

      //password
      const salt = await bcrypt.genSalt(10);
      userFields.password = await bcrypt.hash(password, salt);

      user = new User(userFields);
      user.verified = false;
      await user.save();
      //prepare templates and send welcome email
      let token = uuid.v4().slice(0, 8);

      const templateFields = {
        to: email,
        subject: "Welcome to Brox Technology",
        name: name,
        email: email,
        token: token,
        url: `localhost:3000/confirm/${token}`,
        selectedTemplate: "NEW_ACCOUNT_MESSAGE",
      };

      let emailService = new EmailService(templateFields);
      await emailService.sendEmail();

      //create confirmation email
      let confirmation = new ConfirmationEmail();
      confirmation.token = token;
      confirmation.email = email;
      await confirmation.save();

      //add to history
      let userHistoryService = new UserHistoryService();
      let userHistoryFields = {
        description: "New Account set up",
        updatedBy: newUserRequestArgs.adminId,
        user: user._id,
        role: user.role,
        date: new Date(),
      };
      await userHistoryService.addUserHistory(userHistoryFields);

      let response = {
        Status: 200,
        Message: name + " has been created and a welcome email sent",
        User: user,
      };
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  /*Update User*/
  async updateUserPassword(updatedUserArgs) {
    try {
      console.log(updatedUserArgs);

      let { id, currentPassword, newPassword } = updatedUserArgs;
      const userFields = { password: newPassword };
      let user = await User.findOne({ _id: id });
      if (user) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
          let response = {
            Status: "danger",
            Message: "Incorrect password",
            User: user,
          };
          return response;
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);
        user.password = password;
        await user.save();
      }

      //add to history
      let userHistoryService = new UserHistoryService();
      let userHistoryFields = {
        description: "User Password Updated",
        updatedBy: updatedUserArgs.adminId,
        user: id,
        role: user.role,
        date: new Date(),
      };

      await userHistoryService.addUserHistory(userHistoryFields);

      let response = {
        Status: "success",
        Message: "Your password has been updated",
        User: user,
      };

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /*Delete User*/
  async deleteUser(params) {
    try {
      const { id, adminId } = params;
      let user = await User.findOneAndRemove({ _id: id });
      //add to history
      let userHistoryService = new UserHistoryService();
      let userHistoryFields = {
        description:
          "User Deleted - " +
          user.name +
          " " +
          user.email +
          " " +
          user.postcode,
        updatedBy: adminId,
        user: id,
        date: new Date(),
      };
      await userHistoryService.addUserHistory(userHistoryFields);
      return true;
    } catch {
      return false;
    }
  }

  async resetPassword(params) {
    try {
      const { id } = params;
      let user = await User.findOne({ _id: id });
      if (user) {
        let password = uuid.v4().slice(0, 8);
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        user.password = newPassword;
        await user.save();
        const templateFields = {
          to: user.email,
          subject: "Your password has been reset",
          name: user.name,
          email: user.email,
          password: password,
          selectedTemplate: "PASSWORD_RESET",
        };
        let emailService = new EmailService(templateFields);
        await emailService.sendEmail();
        let response = {
          Status: "SUCCESS",
          Message: user.name + " password has been reset",
          User: user,
        };
        return response;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }
  async lockUser() {}
  async unlockUser() {}
  async onFailedLogin() {}
}

module.exports = AuthService;
