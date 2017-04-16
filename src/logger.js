// seperate file for each IP address

import { isFileSync } from './util'
import { writeFile, readFileSync } from 'fs'

const { stringify, parse } = JSON

export const path = 'routeData.json'

// TODO tests
export default function logRoute (user, prevRoute, currRoute) {
  if (!isFileSync(path)) writeFile(path, stringify({})) // create empty file

  // create or get user data
  let fileData = parse(readFileSync(path).toString())
  if (!fileData[user]) fileData[user] = {}

  // create or get user's route data
  let userData = fileData[user]
  if (!userData[prevRoute]) userData[prevRoute] = {}

  // create or add to user's next route data
  let routeData = userData[prevRoute]
  if (!routeData[currRoute]) routeData[currRoute] = 1
  else routeData++

  // set new user data and update file
  fileData.userData = userData
  const updatedData = JSON.stringify(fileData)
  writeFile(path, updatedData, function (error) {
    if (error) console.error('write error:  ' + error.message)
  })
}

// TODO make it a stream
// var wstream = fs.createWriteStream('myOutput.txt')
// wstream.write('Hello world!\n')
// wstream.write('Another line\n')
// wstream.end()
