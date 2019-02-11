const { Licence } = require("../models");
const { User } = require("../models");
const { to, ReE, ReS } = require("../services/util.service");
var crypto = require("crypto");

const create = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, licence;
  let user = req.body.user;

  const part1 = crypto.randomBytes(3).toString("hex");
  const part2 = crypto.randomBytes(3).toString("hex");
  const part3 = crypto.randomBytes(3).toString("hex");

  req.body.key = `${part1}-${part2}-${part3}`;

  let licence_info = req.body;

  licence_info.user = { _id: user };

  [err, licence] = await to(Licence.create(licence_info));

  if (err) return ReE(res, err, 422);

  return ReS(res, { licence: licence.toWeb() }, 201);
};
module.exports.create = create;

const getAll = async function(req, res) {
  res.setHeader("Content-Type", "application/json");

  [err, licences] = await to(
    Licence.find({})
      .populate("user")
      .exec()
  );

  return ReS(res, licences);
};
module.exports.getAll = getAll;

const get = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  return Licence.findOne({ _id: id }, function(err, licence) {
    if (err) {
      res.send("Error guetting licence");
      next();
    }
    ReS(res, licence);
  });
};
module.exports.get = get;

const update = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, licence;

  let licence_info = req.body;

  [err, licence] = await to(Licence.findOneAndUpdate(
    { _id: req.body._id },
    { $set: licence_info },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  ));
  if (err) return ReE(res, err, 422);
  
  return ReS(res, { licence }, 201);
};
module.exports.update = update;

// const remove = async function(req, res){
//     let company, err;
//     company = req.company;

//     [err, company] = await to(company.remove());
//     if(err) return ReE(res, 'error occured trying to delete the company');

//     return ReS(res, {message:'Deleted Company'}, 204);
// }
// module.exports.remove = remove;
