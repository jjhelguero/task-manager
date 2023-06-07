require("../src/db/mongoose");
const Task = require("../src/db/models/tasks");

Task.findByIdAndDelete("647f99822abc37fcc5142dbd")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));

const deleteTaskAndCount = async (id) => {
  const deleteTask = await Task.findByIdAndDelete(id)
  const countIncomplete = await Task.countDocuments({completed: false})
  return countIncomplete
}

deleteTaskAndCount("647f99872abc37fcc5142dbf")
  .then(count => console.log(count))
  .catch(e => console.log(e))