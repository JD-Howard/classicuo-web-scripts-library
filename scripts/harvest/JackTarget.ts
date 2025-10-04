import * as lib from '../_library'; // Requires the _library script be recreated in ClassicUO and change ../ => ./

// This goofy syntax wraps/scopes the variables/functions so they don't propagate into other scripts.
(() => {
  // verify dependencies
  try { lib.Helper.loaded(); } catch { client.headMsg('lib is not loaded', player, 44); exit(); }
  
  function tryOffloadingLogs() {
    try {        
            
      const logs = client.findAllItemsOfType(lib.Gfx.Carpenter.Logs, undefined, player.backpack, undefined, 0);
      logs.forEach(log => {
        player.useItemInHand();
        target.waitTargetEntity(log, 500);
        sleep(500);
      });

      const boards = client.findAllItemsOfType(lib.Gfx.Carpenter.Boards, undefined, player.backpack, undefined, 0);      
      return boards.every(x => lib.World.moveToPackAnimal(x)); // TODO: Add floor drop alt path
    } catch (e) {
      return false;
    }
  }


  // Define journal text that can stop the loop
  const stopText = [
    ...lib.Messages.StopText.HarvestBase, 
    "You can't use an axe on that.", 
    "not enough wood here to harvest."
  ];
  
  // Prompt for source tree to lumberjack
  const tree = target.query(true);
  if (tree.graphic === 0) {
    exit("invalid target");
  }

  let enabled = true;
  do {
    journal.clear();  
    player.useItemInHand();
    sleep(200);
    target.terrain(tree.x, tree.y, tree.z, tree.graphic);    
    sleep(2000);
    target.cancel(); // in case left open

    if (stopText.some(s => journal.containsText(s))) {
      enabled = false;
    }

    if (enabled && player.weight > player.weightMax - 50) {
      enabled = tryOffloadingLogs();
    }
  } while (enabled)

})();

