const mongoose = require("mongoose");
const { TE, to } = require("../services/util.service");

let LicenceSchema = mongoose.Schema(
  {
    description: { type: String },
    dueDate: { type: Date },
    active: { type: Boolean },
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    
  },
  { timestamps: true }
);

LicenceSchema.virtual("name").set(function(name) {
  var split = name.split(" ");
  this.first = split[0];
  this.last = split[1];
});

LicenceSchema.virtual("name").get(function() {
  //now you can treat as if this was a property instead of a function
  if (!this.first) return null;
  if (!this.last) return this.first;

  return this.first + " " + this.last;
});

LicenceSchema.methods.toWeb = function() {
  let json = this.toJSON({ virtuals: true });
  json.id = this._id; //this is for the front end
  return json;
};

let licence = (module.exports = mongoose.model("Licence", LicenceSchema));
