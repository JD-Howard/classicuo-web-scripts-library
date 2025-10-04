import * as lib from '../_library';

// Get bandage object and exit if we don't have a sufficient quantity
let bandage = client.findType(lib.Gfx.Tailor.Bandage, undefined, player.backpack) as Item;
if (bandage.amount < 20) {
  client.headMsg('Insufficient bandages to commence training', player, 66);
  exit();
}

// prompt user for a sparing dummy mob
let dummy = target.query(false);

// make the dummy attack you and then 
if (player.inWarMode === false) {
  player.toggleWarMode();
}
player.attack(dummy);

// stop attacking the dummy so we don't kill it.
player.toggleWarMode();

do {
  // check if we are < 90% health and apply bandage if true
  if (player.hits / player.maxHits < 0.90) {
    player.use(bandage.serial);
    target.waitTargetSelf(250);    
  }

  // this creates a time gap for next check and closes any rogue target cursors
  sleep(3500);
  target.cancel();

  // kill the dummy if we start running out of bandages
  if (player.inWarMode === false && bandage.amount < 5) {
    player.toggleWarMode();
    player.attack(dummy);    
  }
} while (bandage.amount > 0 && dummy.object) // continue loop if we have bandages & dummy lives

