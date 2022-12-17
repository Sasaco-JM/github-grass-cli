#!/usr/bin/env node
import fetch from 'node-fetch'
import readlineSync from 'readline-sync'
import { extractContributions, displayContiributions } from './functions.js'

const userName = readlineSync.question(
  'enter github username you want to see -> '
)
const accessToken = readlineSync.question('enter your github access token -> ')

const query = `
query($userName:String!) {
  user(login: $userName){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`
const variables = `
{
  "userName": "${userName}"
}
`
const body = {
  query,
  variables
}

fetch('https://api.github.com/graphql', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
  .then((res) => res.text())
  .then((body) => extractContributions(body))
  .then((contributions) => displayContiributions(contributions))
  .catch((error) => console.error(error))
