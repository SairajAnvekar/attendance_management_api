const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('@config');

const api = {};

api.get = (Team, Token) => (req, res) => {
  let querry = {};
  const manager_id = req.query.manager_id;
  if (manager_id) {
    querry = {
      manager_id: manager_id
    };
  }
  if (Token) {
    Team.find(querry, (error, team) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(team);
      return true;
    })
  } else return res.status(403).send({
    success: false,
    message: 'Unauthorized'
  });
}

api.save = (Team, Token) => (req, res) => {
  console.log(Team);
  if (Token) {
    const team = new Team({
      name: req.body.name,
      manager_id: req.body.manager_id,
      members: req.body.members
    });

    team.save((error, team) => {
      if (error) return res.status(400).json(error);
      res.status(200).json({
        success: true,
        team: team
      });
    })
  }
}

api.members= (Team, User, token) => (req, res) => {
  if (token) {

   let query ={};
  const manager_id = req.query.manager_id;
  const team_id = req.query.team_id;
  if (manager_id) {
    query = {
      manager_id: manager_id
    };
  }
  if (team_id) {
     query = {
      _id: mongoose.Types.ObjectId(team_id)
    };
  }

  console.log(query);
    Team.aggregate([
      { $match : query} , 
      {
        $unwind: "$members"
      },
      {
        $group: {
          _id: null,
          member: {
            $addToSet: "$members"
          }
        }
      },
    ]).exec((err, test) => {

      console.log(test);
      User.find({
        _id: {
          $in: test[0]?test[0].member:[]
        }
      }, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);

      });
    })

  } else return res.status(403).send({
    success: false,
    message: 'Unauthorized'
  });

}



module.exports = api;