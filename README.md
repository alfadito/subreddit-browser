# Subreddit Browser

This is a web application to browse a selected subreddit.

To change subreddit, modify `/const/const.js` and change the variable `SUBREDDIT_NAME` to your chosen subreddit name.

Built using Next.js and Redux.

## How to run

### Setup environment variable

Add these variable to a `.env` file 
```
NEXT_PUBLIC_CLIENT_ID=[your_reddit_api_client_id]

NEXT_PUBLIC_CLIENT_SECRET=[your_reddit_api_client_secret]
```

### Install dependencies

```
npm i
```

### Running dev with HMR

```
npm run dev
```

### Running production build

```
npm run build
npm start
```

### Running production build in container

```
docker compose up --build
```