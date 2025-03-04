//Imports
const getTaskData = require("./helpers/getTaskData");
const storeData = require("./helpers/storeData");
const { Connection } = require("@_koii/web3.js");
require("dotenv").config();

let round = 0;
const taskId = process.env.TASK_ID;


/**
 * Main function to retry the task data fetch until a new round is found
 */
async function main() {
  const connection = new Connection("https://mainnet.koii.network");

  const getTaskDataWrapper = async (taskId, round) => {
    let wrappedTaskData = await getTaskData(connection, taskId, round);
    console.log(wrappedTaskData);
    if (wrappedTaskData === false) {
      console.log("No new round found. Retrying in 60 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 60000));
      return await getTaskDataWrapper(taskId, round);
    } else {
      return wrappedTaskData;
    }
  };
  
  const taskData = await getTaskData(
    connection,
    taskId,
    round
  );

  // console.log(taskData);
  await storeData(taskId, taskData.maxRound, taskData.submissions);
}

main();
