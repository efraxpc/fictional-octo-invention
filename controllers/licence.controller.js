const { Licence } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, licence;
    let user = req.body.user;

    let licence_info = req.body;
    licence_info.users = [{user:user._id}];

    [err, licence] = await to(Licence.create(licence_info));
    if(err) return ReE(res, err, 422);

    return ReS(res,{licence:licence.toWeb()}, 201);

}
module.exports.create = create;


const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, licences;
    [err, licences] = await to(user.licences());

    let licences_json = []
    for (let i in licences){
        let licence = licences[i];
        licences_json.push(licence.toWeb())
    }
    return ReS(res, {licences: licences_json});
}
module.exports.getAll = getAll;

// const get = function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     let company = req.company;
//     return ReS(res, {company:company.toWeb()});
// }
// module.exports.get = get;

// const update = async function(req, res){
//     let err, company, data;
//     company = req.user;
//     data = req.body;
//     company.set(data);

//     [err, company] = await to(company.save());
//     if(err){
//         return ReE(res, err);
//     }
//     return ReS(res, {company:company.toWeb()});
// }
// module.exports.update = update;

// const remove = async function(req, res){
//     let company, err;
//     company = req.company;

//     [err, company] = await to(company.remove());
//     if(err) return ReE(res, 'error occured trying to delete the company');

//     return ReS(res, {message:'Deleted Company'}, 204);
// }
// module.exports.remove = remove;