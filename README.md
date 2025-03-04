# Koii Task Middleman

This project aims to bridge the gap between the Koii Task Submissions and a standardized database.

![Task Middleman](https://i.imgur.com/JeNpHHO.png)

## Steps:

- Reads submissions from a Koii Task.
- Extracts the referred data from IPFS using a submission list.
- Stores the data in a MongoDB database.
- Server API: Includes an Express.js server setup to manage keywords and receive task data updates.

It uses a queuing system to manage concurrency and ensure efficient processing.

## Structure

- **index.js**: Main entry point that fetch task data every 15 minutes and save it to mongoDB.
- **queue.js**: Contains the logic for queuing the tasks, such as sending tweets and handling CID data and save data do mongoDB.
- **server.js**: Server setup to interact with the running Task.


## Dependencies

- **async-await-queue**: For managing task concurrency.
- **axios**: For making HTTP requests.
- **@_koii/web3.js**: For interacting with the Koii blockchain.
- **dotenv**: For managing environment variables.
- **node-cron**: For scheduling the task data fetch.

## Usage

1. Install Dependencies
   Before running the project, make sure to install the required dependencies:

```bash
yarn
```
or

```bash
npm install
```

2. Configure .env file
   Ensure that the `TASK_ID` is properly configured in .env file. The mongoDB connection string is also required in .env file.

3. Run the Project
   You can run the project by executing the following command:

```bash
yarn start
```
or

```
npm run start
```

This will start the process of fetching task data every 15 minutes and save it to mongoDB.

## Functions
### index.js
- **main()**: Keeps fetching task data every 15 minutes and save it to mongoDB.

### queue.js
- **queueCID(submissionList)**
  - Parameters:
    - **submissionList**: An array of submission data including CIDs.
  - Description: Extracts task data from IPFS using the provided CIDs.

- **queuePost(tweetList, i)**
  - Parameters:
    - **tweetList**: An array of tweet data.
    - **i**: An index used for tracking the process.
  - Description: Handles the queuing and sending of tweets to the server.

### helpers/getTaskData.js
- **getTaskData(taskID, round)**: Gets the task Data and wait for new round to load

### helpers/dataFromCid.js
- **dataFromCid(cid, filename)**: Gets the content from both IPFS Storage SDK and direct accessing (as backup)
