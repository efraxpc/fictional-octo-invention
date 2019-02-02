const { Group } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, group;
    let user = req.body.user;

    let group_info = req.body;
    group_info.users = [{user:user._id}];

    [err, group] = await to(Group.create(group_info));
    if(err) return ReE(res, err, 422);

    return ReS(res,{group:group.toWeb()}, 201);

}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, groups;
    [err, groups] = await to(user.groups());

    let groups_json = []
    for (let i in groups){
        let group = groups[i];
        groups_json.push(group.toWeb())
    }
    return ReS(res, {groups: groups_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let company = req.company;
    return ReS(res, {company:company.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, company, data;
    company = req.user;
    data = req.body;
    company.set(data);

    [err, company] = await to(company.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {company:company.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let company, err;
    company = req.company;

    [err, company] = await to(company.remove());
    if(err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, {message:'Deleted Company'}, 204);
}
module.exports.remove = remove;