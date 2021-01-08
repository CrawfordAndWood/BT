const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

//Services
const EmailService = require("../services/EmailService");
const UserHistoryService = require("../services/UserHistoryService");

//Models
const User = require("../models/User");
const Role = require("../models/Roles");

class UserService {
  constructor() {}
  /*Count Users */
  async countUsers(term = null) {
    if (term === null) {
      const userCount = await User.countDocuments();
      return userCount;
    }
    const regTerm = new RegExp(term, "i");
    const userCount = await User.countDocuments({
      $or: [{ name: regTerm }, { email: regTerm }, { postcode: regTerm }],
    });
    return userCount;
  }

  async getUser(params) {
    const user = User.findOne({ _id: params.user.id })
      .populate("role")
      .select("-password");
    return user;
  }

  /*Get Users*/
  async getUsers(params) {
    if (params.term === undefined) {
      let users = await User.find()
        .skip(Number(params.page - 1) * Number(params.limit))
        .select("-password")
        .limit(Number(params.limit));
      return users;
    }
    let term = new RegExp(params.term, "i");
    let users = await User.find({
      $or: [{ name: term }, { email: term }, { postcode: term }],
    })
      .skip(Number(params.page - 1) * Number(params.limit))
      .select("-password")
      .limit(Number(params.limit));
    return users;
  }

  /*Update User*/
  async updateUser(updatedUserArgs) {
    try {
      let { id, email, name, postcode, roleId } = updatedUserArgs;
      const userFields = { id, email, name, role: roleId, postcode };
      let userWithEmail = await User.findOne({ email: email });
      if (userWithEmail && userWithEmail._id != id) {
        let response = {
          Status: "FAILED",
          Message: email + " already exists and is assigned to another user",
        };
        return response;
      }
      let user = {};
      let existingUser = await User.findOne({ _id: id });
      if (existingUser) {
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: userFields },
          {
            new: true,
          }
        );
      }

      let oldRole = await Role.findOne({ _id: existingUser.role }).select(
        "name"
      );

      let newRole = await Role.findOne({ _id: user.role }).select("name");
      let desc = `Admin updated user. 
      Old: ${existingUser.name}  ${existingUser.email} ${existingUser.postcode} ${oldRole.name}
      New: ${user.name} ${user.email} ${user.postcode} ${newRole.name}`;
      //add to history
      let userHistoryService = new UserHistoryService();
      let userHistoryFields = {
        description: desc,
        updatedBy: updatedUserArgs.adminId,
        user: id,
        role: newRole,
        date: new Date(),
      };
      await userHistoryService.addUserHistory(userHistoryFields);

      //Prepare response message
      let response = {
        Status: "SUCCESS",
        Message: name + " has been updated",
        User: user,
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /*Update User Details*/
  async updateUserDetails(updatedUserArgs) {
    try {
      let { id, email, name, postcode } = updatedUserArgs;
      const userFields = { id, email, name, postcode };
      let userWithEmail = await User.findOne({ email: email });
      if (userWithEmail && userWithEmail._id != id) {
        let response = {
          Status: "FAILED",
          Message: email + " already exists and is assigned to another user",
        };
        return response;
      }
      let user = await User.findOne({ _id: id });
      if (user) {
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: userFields },
          {
            new: true,
          }
        );
      }

      //add to history
      let userHistoryService = new UserHistoryService();
      let userHistoryFields = {
        description: "User Details Updated",
        updatedBy: updatedUserArgs.adminId,
        user: id,
        role: user.role,
        date: new Date(),
      };
      console.log(
        "user service adding userhistory userdetails",
        userHistoryFields
      );
      await userHistoryService.addUserHistory(userHistoryFields);

      //return resp
      let response = {
        Status: "success",
        Message: "Your details been updated",
        User: user,
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
