import * as lib from '../_library'; // Requires the _library script be recreated in ClassicUO and change ../ => ./

// This goofy syntax wraps/scopes the variables/functions so they don't propagate into other scripts.
(() => {
  // verify dependencies
  try { lib.Helper.loaded(); } 
  catch { client.headMsg('Script library is not loaded', player, 44); exit(); }

  function tryPackOre(): boolean {
    if (player.followers === 0) return false;
    let initWeight = player.weight; // store the initial player weight    
    lib.Helper.getCustomObjectValues(lib.Gfx.Ore).forEach(oreType => {
      client.findAllItemsOfType(oreType, null, player.backpack).forEach(oreStack => {
        lib.World.moveToPackAnimal(oreStack);
      });
    });
    return player.weight != initWeight;
  }

  function tryDropOre(): boolean {    
    let initWeight = player.weight; // store the initial player weight

    // locate the full-stack iron ore in the players backpack
    let ore = client.findType(lib.Gfx.Ore.Large, lib.Hue.Ore.Iron, player.backpack, undefined, 0) as Item;
    if (typeof ore?.amount !== 'number') {
      return false; // no iron ore found
    }

    lib.World.tryDropItem(ore);
    return player.weight != initWeight;
  }

  tryCraftShovel() {
    
  }
  

  // Define journal text loop-stop context
  const stopText = [...lib.Messages.StopText.HarvestBase, "There is no metal here to mine."];

  client.sysMsg('Pick a valid mining location', 66);
  const ground = target.query(true);  

  let enabled = true;
  do {
    journal.clear();  
    if (player.useType(0xF39) === false && player.useType(0xE86)) { // try shovel/pickaxe
      break;
    }
    sleep(200);
    target.terrain(ground.x, ground.y, ground.z, ground.graphic);
    sleep(1500);

    if (stopText.some(s => journal.containsText(s))) {
      enabled = false;
    }

    if (enabled && player.weight > player.weightMax) {
      enabled = tryPackOre() || tryDropOre();
    }

  } while (enabled)

})();

