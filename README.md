!!! This is work in progress !!!

# Dev

## Requirements

- Node >= 22
- Golang >= 1.23

## Install

```sh
git clone git@github.com:giniedp/exile-buddy.git
cd exile-buddy
pnpm install
scp .env.example .env
```

Adjust the `.env` file

## Commands

Currently all commands use ENV variables and have no arguments

```sh
pnpm unpack  # unpacks game data
pnpm convert # converts data and some images
pnpm dev:web # starts the web app in dev mode
```
