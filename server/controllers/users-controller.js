const { Users } = require('../models');
const usersController = {
getAllUsers(req, res) {
    Pizza.find({})
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}, 

getUserById({ params }, res) {
    User.findOne({ _id : params.id })
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'This user does not exist(...in our system)'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
}

module.exports = usersController;