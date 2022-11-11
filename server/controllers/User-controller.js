// const { User } = require('../models');

// const userController = {
// getAllUsers(req, res) {
//     User.find({})
//     .then(dbUsersData => res.json(dbUsersData))
//     .catch(err => {
//         console.log(err);
//         res.status(400).json(err);
//     });
// }, 

// getUserById({ params }, res) {
//     User.findOne({ _id : params.id })
//     .then(dbUserData => {
//         if(!dbUserData) {
//             res.status(404).json({message: 'This user does not exist'});
//             return;
//         }
//         res.json(dbUserData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(400).json(err);
//     });
// },
//     createUser({ body }, res) {
//         User.create(body)
//             .then(dbUserData => res.json(dbUserData))
//             .catch(err => res.status(400).json(err));
//     },
//     updateUser({ params, body }, res) {
//         User.findOneAndUpdate({ _id: params.id }, body, {
//             new: true,
//             runValidators: true
//           })
//             .then(dbUserData => {
//               if (!dbUserData) {
//                 res.status(404).json({ message: 'No user with this id!' });
//                 return;
//               }
//               res.json(dbUserData);
//             })
//             .catch(err => res.json(err));
//         },
//         deleteUser({params}, res){
//             User.findOneAndDelete({_id: params.id})
//             .then(dbUserData => {
//                 if (!dbUserData) {
//                     res.status(404).json({ message: "This user does not exist"});
//                     return;
//                 }
//                 res.json(dbUserData);
//             })
//             .catch(err => res.status(400).json(err));
//         }
// }

// module.exports = userController;