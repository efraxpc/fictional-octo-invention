const mongoose = require("mongoose");
const { TE, to } = require("../services/util.service");

let GroupSchema = mongoose.Schema(
  {
    name: { type: String },
    color: { type: String },
    description: { type: String },
    atentionNotification: { type: Boolean },
    geozoneNotification: { type: Boolean },
    lowBatteryNotification: { type: Boolean },
    gpsOffNotification: { type: Boolean },
    gpsOnNotification: { type: Boolean },
    emailNotification: { type: Boolean },
    users: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User" },
        permissions: [{ type: String }]
      }
    ]
  },
  { timestamps: true }
);

GroupSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let group = (module.exports = mongoose.model("Group", GroupSchema));
