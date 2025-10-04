import * as lib from '../_library'; // Requires the _library script be recreated in ClassicUO and change ../ => ./


// This goofy syntax wraps/scopes the variables/functions so they don't propagate into other scripts.
(() => {
  // verify dependencies
  try { lib.Helper.loaded(true); console.clear(); } 
  catch { client.headMsg('lib is not loaded', player, 44); exit(); }  
  
  client.sysMsg('Select a forge', 66);
  const resourceTarget = target.query();
  const small = lib.Gfx.Ore.Small;

    
  function smeltStack(ore: Item, forgeSerial: number) {
    if (ore.graphic === small && ore.amount < 2) return;

    // move item to ground before smelting for compatibility with pack animals
    if (lib.World.tryDropItem(ore) === false) {
      return;
    }

    player.use(ore.serial);
    target.waitTargetEntity(forgeSerial, 1000);
    sleep(500);  

    if (ore && ore.graphic === small && ore.amount < 2) {
      player.moveItem(ore.serial, player.backpack);
      sleep(500);
    }

    target.cancel(); // just in case it gets left open from world save or something.
  }

  const oreTypes = lib.Helper.getCustomObjectValues(lib.Gfx.Ore);
  log(oreTypes);
  oreTypes.forEach(g => {  
    // Note: This will locate ore regardless of whether it is in your pack, ground or on a pet
    client.findAllItemsOfType(g, null, null, null, 2).forEach(stack => {      
      log(`${g} : ${stack.hue} : ${stack.amount}`);
      smeltStack(stack, resourceTarget.serial);      
    });   
  });

})();

