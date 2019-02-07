const mongoose = require("mongoose");
const { TE, to } = require("../services/util.service");
var crypto = require("crypto");

let LicenceSchema = mongoose.Schema(
  {
    description: { type: String },
    dueDate: { type: Date },
    isActive: { type: Boolean },
    key : {type: String},
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    
  },
  { timestamps: true }
);

LicenceSchema.pre('save', function(next) {
  const part1 = crypto.randomBytes(3).toString('hex');
  const part2 = crypto.randomBytes(3).toString('hex');
  const part3 = crypto.randomBytes(3).toString('hex');
  this.key = `${part1}-${part2}-${part3}`
  next();
});

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
