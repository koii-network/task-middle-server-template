//Imports
const getTaskData = require("./helpers/getTaskData");
const storeData = require("./helpers/storeData");
const dataFromCid = require("./helpers/dataFromCid");
const { Connection } = require("@_koii/web3.js");
require("dotenv").config();

let round = 0;
const taskId = process.env.TASK_ID;
const INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Main function to fetch task data every 15 minutes
 */
async function main() {
  const connection = new Connection("https://mainnet.koii.network");
  
  while (true) {
    try {
      const taskData = await getTaskData(connection, taskId, round);
      if (taskData) {
        // Initialize array to store all CID data
        const allSubmissionData = [];
        
        // Collect all CID data
        for (const cid of taskData.submissions) {
          const data = await dataFromCid(cid, 'vote.json');
          allSubmissionData.push(data);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Store all data in one operation
        await storeData(taskId, taskData.maxRound, allSubmissionData);
        console.log(`Data stored successfully at ${new Date().toISOString()}`);
      }
    } catch (error) {
      console.error('Error in main loop:', error);
    }
    
    // Wait for the next interval
    await new Promise(resolve => setTimeout(resolve, INTERVAL));
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Gracefully shutting down...');
  process.exit(0);
});

main().catch(console.error);
