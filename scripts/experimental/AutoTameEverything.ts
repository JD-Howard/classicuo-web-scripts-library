// All of this is from the discord and posted by cafnoir
// Currently just a baseline to develop into a loop that lets you walk around
// auto-taming and releasing everything and tracks what has already been tamed
// It appears to be most of the way to the desired state.
// Also want to move some of this into the _library for recycling purposes.

const releaseGump = 0x8CE2D90C //(!) Check this by get in-game target info

const oneTimeMode = false //'true' for tame only 1 animal 


const arrTame = [
  'It seems to accept',
  'That wasn\'t even challenging'
]

const arrFail = [
  'You fail to tame'
]

const arrElse = [
  'You anger the beast',
  'That animal looks tame',
  'You have too many followers',
  'That creature cannot',
  'You have no chance',
  'Someone else is already taming',
  'far away to continue taming'
]

const arrDir = [Directions.Up, Directions.North, Directions.Right, Directions.East, Directions.Down, Directions.South, Directions.West, Directions.Left]

const journalContains = (arr) =>
  arr.some(s => journal.containsText(s))

const getDirection = (angle) =>
  arrDir[Math.round(angle / 45) % 8]

const getDistance = (x1, y1, x2, y2) =>
  Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))

const getAngle = (x1, y1, x2, y2) => {
  var dy = y2 - y1
  var dx = x2 - x1
  var n = Math.atan2(dy, dx) * (180 / Math.PI)

  return (n < 0) ? (n + 360) : n
}

const getAngleDrift = (d, a) => {
  let n = Math.random() > 0.5 ? (a - d) : (a + d)

  return (n < 0) ? (n + 360) : n
}

const movePlayerSteps = (n, angle) => {
  let d = getDirection(angle)

  for (let i = 0; i < n; i++) {
    player.walk(d)
    sleep(100)
  }
}

const movePlayerToItem = (x, y) => {
  let moveBugCount = 0
  let px, py

  let distance = getDistance(player.x, player.y, x, y)

  while (distance > 1) {
    movePlayerSteps(1, getAngle(x, y, player.x, player.y))
    distance = getDistance(player.x, player.y, x, y)

    if (px == player.x && py == player.y) {
      moveBugCount++

      if (moveBugCount > 5) {
        movePlayerSteps(5, getAngleDrift(90, getAngle(x, y, player.x, player.y)))
        moveBugCount = 0
      }
    }

    px = player.x
    py = player.y
  }
}

const getAnimalItem = (range) =>
  client.selectEntity(
    SearchEntityOptions.Any,
    range, //SearchEntityRangeOptions
    SearchEntityTypeOptions.NonHuman,
    false
  )

const getAnimal = () => {
  let item = getAnimalItem(SearchEntityRangeOptions.Closest)
  if (!item) return null

  let c = 10

  while (c > 0 && ignoreList.contains(item)) {
    item = getAnimalItem(SearchEntityRangeOptions.Next)
    c--
  }

  return c > 0 ? item : null
}

const getAnimal360 = () => {
  let item = getAnimal()

  while (!item) {
    movePlayerSteps(30, Math.random() * 360)

    item = getAnimal()
  }

  return item
}

const releaseAnimal = (serial) => {
  popupMenu.request(serial)
  popupMenu.waitUntilOpen(1000)
  popupMenu.reply(9) //Release

  let gump = Gump.findOrWait(releaseGump, 3000)
  gump.reply(2) //Continue
}


//
journal.clear()

let item
let skillUsed
let failCount = 0

while (true) {
  if (!item) item = getAnimal360()

  movePlayerToItem(item.x, item.y)

  if (!skillUsed) {
    player.useSkill('AnimalTaming', item.serial)
    skillUsed = true
  } else {
    let flag = 0

    if journalContains(arrTame) {
      if (oneTimeMode) {
        break
      }
      releaseAnimal(item.serial)
      flag = 1
    } else if journalContains(arrFail) {
      failCount++
      flag = failCount > 5 ? 1 : 2
    } else if journalContains(arrElse) {
      flag = 1
    }

    if (flag > 0) {
      journal.clear()
      skillUsed = false

      if (flag == 1) {
        ignoreList.add(item)
        item = null
        failCount = 0
      }
    }
  }

  sleep(1000)
}
