require('../src/db/mongoose')
const User = require('../src/db/models/users')

User.findByIdAndUpdate("647f9223e0706e51d2a6f55a", { age: 100 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((usersAgeOne) => {
    console.log(usersAgeOne);
  })
  .catch((e) => console.log(e));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {age})
  const count = await User.countDocuments({age})
  return count
}

updateAgeAndCount("647f9223e0706e51d2a6f55a", 200)
  .then(count => console.log(count))
  .catch(e => console.log(e))