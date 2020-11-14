var express = require('express');
var router = express.Router();

// Lodash utils library
const _ = require('lodash');


let users = [{
  user:"arthur",
  id:"0",
}]

/* GET users listing. */
router.get('/', (req, res) => {
  res.status(200).json({users});
});

router.get('/:id', (req, res) => {
  const{id} = req.params;
  const user = _.find(users, ["id",id]);
  res.status(200).json({
    message:"User found!", users
  });
});


module.exports = router;
