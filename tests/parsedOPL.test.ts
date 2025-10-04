import { describe, it, expect } from 'vitest';
import * as lib from '../scripts/_library';

describe('Validate _library.ParsedOPL on Mobiles', () => {
  it('Mobile - Player Self', () => {
    const json = '{"serial":179239851,"graphic":400,"hue":33770,"amount":1,"name":"Dalmore","data":"Citizen Of Minoc","isPartialHue":false,"properties":[{"id":1050045,"order":1,"text":"~1_PREFIX~~2_NAME~~3_SUFFIX~","values":[{"id":0,"order":0,"text":" "},{"id":0,"order":1,"text":"Dalmore"},{"id":0,"order":2,"text":" "}]},{"id":1152803,"order":2,"text":"Citizen Of Minoc","values":[]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('Dalmore');
    expect(sut.isTame).to.equal(false);
    expect(sut.weight).to.equal(Number.MAX_VALUE); // getting the OPL of a player or NPC doesn't yield much
  });

  it('Mobile - NPC', () => {
    const json = '{"serial":418983,"graphic":401,"hue":33804,"amount":1,"name":"Calendonia","data":"","isPartialHue":false,"properties":[{"id":1050045,"order":1,"text":"~1_PREFIX~~2_NAME~~3_SUFFIX~","values":[{"id":0,"order":0,"text":" "},{"id":0,"order":1,"text":"Calendonia"},{"id":0,"order":2,"text":" the town crier"}]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('Calendonia');
    expect(sut.isTame).to.equal(false);
    expect(sut.weight).to.equal(Number.MAX_VALUE); // getting the OPL of a player or NPC doesn't yield much
    // NOTE: this is the first instance I've seen where the properties[] contained truly additional information
  });  

  it('Mobile - Pack Horse', () => {
    const json = '{"serial":183579941,"graphic":291,"hue":0,"amount":1,"name":"packet","data":"Weight: 33 Stones\\n(tame)\\nLoyalty Rating: 100%\\nTotal Items: 9/125","isPartialHue":false,"properties":[{"id":1050045,"order":1,"text":"~1_PREFIX~~2_NAME~~3_SUFFIX~","values":[{"id":0,"order":0,"text":" "},{"id":0,"order":1,"text":"packet"},{"id":0,"order":2,"text":" "}]},{"id":1072789,"order":2,"text":"Weight: ~1_WEIGHT~ Stones","values":[{"id":0,"order":0,"text":"33"}]},{"id":502006,"order":3,"text":"(tame)","values":[]},{"id":1060662,"order":4,"text":"~1_val~: ~2_val~","values":[{"id":0,"order":0,"text":"Loyalty Rating"},{"id":0,"order":1,"text":"100%"}]},{"id":1042971,"order":5,"text":"~1_NOTHING~","values":[{"id":0,"order":0,"text":"Total Items: 9/125"}]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('packet');
    expect(sut.isTame).to.equal(true);

    // pack animals are unique that they also emulate a bag
    expect(sut.weight).to.equal(33);
    expect(sut.capacity?.lower).to.equal(9);
    expect(sut.capacity?.upper).to.equal(125);
  });
});

describe('Validate _library.ParsedOPL on Items', () => {

  
  it('Item - Ore Stack', () => {
    const json = '{"serial":1083252335,"graphic":6585,"hue":2413,"amount":7,"name":"7 Ore","data":"Weight: 84 Stones\\nCopper","isPartialHue":false,"properties":[{"id":1050039,"order":1,"text":"~1_NUMBER~ ~2_ITEMNAME~","values":[{"id":0,"order":0,"text":"7"},{"id":1026583,"order":1,"text":"Ore"}]},{"id":1072789,"order":2,"text":"Weight: ~1_WEIGHT~ Stones","values":[{"id":0,"order":0,"text":"84"}]},{"id":1053106,"order":3,"text":"Copper","values":[]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('7 Ore');
    expect(sut.weight).to.equal(84); 
  });


  it('Item - Bracelet Lesser Artifact', () => {
    const json = '{"serial":1085693666,"graphic":4230,"hue":0,"amount":1,"name":"Bracelet","data":"Weight: 1 Stone\\nAntique\\nPeacemaking +10\\nSwing Speed Increase 5%\\nFaster Casting 1\\nSpell Damage Increase 16%\\nLower Mana Cost 8%\\nLower Reagent Cost 13%\\nDurability 250 / 255\\n<BASEFONT COLOR=#A335EE>Lesser Artifact","isPartialHue":false,"properties":[{"id":1024230,"order":1,"text":"Bracelet","values":[]},{"id":1072788,"order":2,"text":"Weight: ~1_WEIGHT~ Stone","values":[{"id":0,"order":0,"text":"1"}]},{"id":1076187,"order":3,"text":"Antique","values":[]},{"id":1060451,"order":4,"text":"~1_skillname~ +~2_val~","values":[{"id":1044069,"order":0,"text":"Peacemaking"},{"id":0,"order":1,"text":"10"}]},{"id":1060486,"order":5,"text":"Swing Speed Increase ~1_val~%","values":[{"id":0,"order":0,"text":"5"}]},{"id":1060413,"order":6,"text":"Faster Casting ~1_val~","values":[{"id":0,"order":0,"text":"1"}]},{"id":1060483,"order":7,"text":"Spell Damage Increase ~1_val~%","values":[{"id":0,"order":0,"text":"16"}]},{"id":1060433,"order":8,"text":"Lower Mana Cost ~1_val~%","values":[{"id":0,"order":0,"text":"8"}]},{"id":1060434,"order":9,"text":"Lower Reagent Cost ~1_val~%","values":[{"id":0,"order":0,"text":"13"}]},{"id":1060639,"order":10,"text":"Durability ~1_val~ / ~2_val~","values":[{"id":0,"order":0,"text":"255"},{"id":0,"order":1,"text":"255"}]},{"id":1042971,"order":11,"text":"~1_NOTHING~","values":[{"id":0,"order":0,"text":"<BASEFONT COLOR=#A335EE>Lesser Artifact"}]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('Bracelet');
    expect(sut.weight).to.equal(1); 
    expect(sut.durability?.lower).to.equal(250);
    expect(sut.durability?.upper).to.equal(255);
    expect(sut.getSkillValue(Skills.Peacemaking)).to.equal(10);
    expect(sut.magicLevel).to.equal(0);
    expect(sut.artifactLevel).to.equal(1);
    expect(sut.hasNegativeStats).to.equal(true);    
    expect(sut.lowerManaCost).to.equal(8);
    expect(sut.lowerReagentCost).to.equal(13);
    expect(sut.spellDamageIncrease).to.equal(16);
    expect(sut.swingIncrease).to.equal(5);
    expect(sut.castIncrease).to.equal(1);
  });

  it('Item - Bracelet Major Artifact', () => {
    const json = '{"serial":1085708252,"graphic":4230,"hue":0,"amount":1,"name":"Bracelet","data":"Cursed\\nWeight: 1 Stone\\nFocus +15\\nResisting Spells +15\\nParrying +10\\nBushido +10\\nDexterity Bonus 7\\nMana Regeneration 4\\nHit Chance Increase 15%\\nSwing Speed Increase 5%\\nDurability 255 / 255\\n<BASEFONT COLOR=#FF8000>Major Artifact","isPartialHue":false,"properties":[{"id":1024230,"order":1,"text":"Bracelet","values":[]},{"id":1049643,"order":2,"text":"Cursed","values":[]},{"id":1072788,"order":3,"text":"Weight: ~1_WEIGHT~ Stone","values":[{"id":0,"order":0,"text":"1"}]},{"id":1060451,"order":4,"text":"~1_skillname~ +~2_val~","values":[{"id":1044110,"order":0,"text":"Focus"},{"id":0,"order":1,"text":"15"}]},{"id":1060452,"order":5,"text":"~1_skillname~ +~2_val~","values":[{"id":1044086,"order":0,"text":"Resisting Spells"},{"id":0,"order":1,"text":"15"}]},{"id":1060453,"order":6,"text":"~1_skillname~ +~2_val~","values":[{"id":1044065,"order":0,"text":"Parrying"},{"id":0,"order":1,"text":"10"}]},{"id":1060454,"order":7,"text":"~1_skillname~ +~2_val~","values":[{"id":1044112,"order":0,"text":"Bushido"},{"id":0,"order":1,"text":"10"}]},{"id":1060409,"order":8,"text":"Dexterity Bonus ~1_val~","values":[{"id":0,"order":0,"text":"7"}]},{"id":1060440,"order":9,"text":"Mana Regeneration ~1_val~","values":[{"id":0,"order":0,"text":"4"}]},{"id":1060415,"order":10,"text":"Hit Chance Increase ~1_val~%","values":[{"id":0,"order":0,"text":"15"}]},{"id":1060486,"order":11,"text":"Swing Speed Increase ~1_val~%","values":[{"id":0,"order":0,"text":"5"}]},{"id":1060639,"order":12,"text":"Durability ~1_val~ / ~2_val~","values":[{"id":0,"order":0,"text":"255"},{"id":0,"order":1,"text":"255"}]},{"id":1042971,"order":13,"text":"~1_NOTHING~","values":[{"id":0,"order":0,"text":"<BASEFONT COLOR=#FF8000>Major Artifact"}]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('Bracelet');
    expect(sut.weight).to.equal(1); 
    expect(sut.durability?.lower).to.equal(255);
    expect(sut.durability?.upper).to.equal(255);
    expect(sut.magicLevel).to.equal(0);
    expect(sut.artifactLevel).to.equal(3);
    expect(sut.hasNegativeStats).to.equal(true);    
    expect(sut.manaRegen).to.equal(4);
    expect(sut.hitChanceIncrease).to.equal(15);
    expect(sut.swingIncrease).to.equal(5);
    expect(sut.getSkillValue(Skills.Focus)).to.equal(15);
    expect(sut.getSkillValue(Skills.MagicResist)).to.equal(15);
    expect(sut.getSkillValue(Skills.Parry)).to.equal(10);
    expect(sut.getSkillValue(Skills.Bushido)).to.equal(10);

    const allSkills = sut.getAllSkillValues();
    expect(allSkills.find(s => s.skill === Skills.Focus)?.value).to.equal(15);
    expect(allSkills.find(s => s.skill === Skills.MagicResist)?.value).to.equal(15);
    expect(allSkills.find(s => s.skill === Skills.Parry)?.value).to.equal(10);
    expect(allSkills.find(s => s.skill === Skills.Bushido)?.value).to.equal(10);

    // These are from previous test that should not exist on this Item
    expect(sut.lowerReagentCost).to.equal(0);
    expect(sut.spellDamageIncrease).to.equal(0);    
    expect(sut.castIncrease).to.equal(0);
  });

  it('Item - Cap from Set of 6', () => {
    const json = '{"serial":1093833292,"graphic":7609,"hue":1158,"amount":1,"name":"Armor Of Initiation","data":"Blessed\\nWeight: 1 Stone\\nPart Of An Armor Set (6 Pieces)\\nFull Armor Set Present\\nPhysical Resist 44% (total)\\nFire Resist 29% (total)\\nCold Resist 29% (total)\\nPoison Resist 39% (total)\\nEnergy Resist 29% (total)\\nBrittle\\nPhysical Resist 7%\\nFire Resist 4%\\nCold Resist 4%\\nPoison Resist 6%\\nEnergy Resist 4%\\nStrength Requirement 20\\nDurability 99 / 150","isPartialHue":false,"properties":[{"id":1116255,"order":1,"text":"Armor Of Initiation","values":[]},{"id":1038021,"order":2,"text":"Blessed","values":[]},{"id":1072788,"order":3,"text":"Weight: ~1_WEIGHT~ Stone","values":[{"id":0,"order":0,"text":"1"}]},{"id":1072376,"order":4,"text":"Part Of An Armor Set (~1_val~ Pieces)","values":[{"id":0,"order":0,"text":"6"}]},{"id":1072377,"order":5,"text":"Full Armor Set Present","values":[]},{"id":1080361,"order":6,"text":"Physical Resist ~1_val~% (total)","values":[{"id":0,"order":0,"text":"44"}]},{"id":1080362,"order":7,"text":"Fire Resist ~1_val~% (total)","values":[{"id":0,"order":0,"text":"29"}]},{"id":1080363,"order":8,"text":"Cold Resist ~1_val~% (total)","values":[{"id":0,"order":0,"text":"29"}]},{"id":1080364,"order":9,"text":"Poison Resist ~1_val~% (total)","values":[{"id":0,"order":0,"text":"39"}]},{"id":1080365,"order":10,"text":"Energy Resist ~1_val~% (total)","values":[{"id":0,"order":0,"text":"29"}]},{"id":1116209,"order":11,"text":"Brittle","values":[]},{"id":1060448,"order":12,"text":"Physical Resist ~1_val~%","values":[{"id":0,"order":0,"text":"7"}]},{"id":1060447,"order":13,"text":"Fire Resist ~1_val~%","values":[{"id":0,"order":0,"text":"4"}]},{"id":1060445,"order":14,"text":"Cold Resist ~1_val~%","values":[{"id":0,"order":0,"text":"4"}]},{"id":1060449,"order":15,"text":"Poison Resist ~1_val~%","values":[{"id":0,"order":0,"text":"6"}]},{"id":1060446,"order":16,"text":"Energy Resist ~1_val~%","values":[{"id":0,"order":0,"text":"4"}]},{"id":1061170,"order":17,"text":"Strength Requirement ~1_val~","values":[{"id":0,"order":0,"text":"20"}]},{"id":1060639,"order":18,"text":"Durability ~1_val~ / ~2_val~","values":[{"id":0,"order":0,"text":"150"},{"id":0,"order":1,"text":"150"}]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('Armor Of Initiation');
    expect(sut.weight).to.equal(1); 
    expect(sut.durability?.lower).to.equal(99);
    expect(sut.durability?.upper).to.equal(150);    
    expect(sut.isBlessed).to.equal(true);
    expect(sut.hasNegativeStats).to.equal(true);    
    
    // expects these to NOT not return the sets total value
    expect(sut.physicalResist).to.equal(7); 
    expect(sut.fireResist).to.equal(4);
    expect(sut.coldResist).to.equal(4);
    expect(sut.poisonResist).to.equal(6);
    expect(sut.energyResist).to.equal(4);
    
    // these are from the prior test and not expected to have a value
    expect(sut.getSkillValue(Skills.Peacemaking)).to.equal(0);
    expect(sut.magicLevel).to.equal(0);
    expect(sut.artifactLevel).to.equal(0);    
    expect(sut.lowerManaCost).to.equal(0);
    expect(sut.lowerReagentCost).to.equal(0);
    expect(sut.spellDamageIncrease).to.equal(0);
    expect(sut.swingIncrease).to.equal(0);
    expect(sut.castIncrease).to.equal(0);
  });

  it('Item - Exceptional Hatchet', () => {
    const json = '{"serial":1079319364,"graphic":3907,"hue":0,"amount":1,"name":"Hatchet","data":"Exceptional\\nWeight: 4 Stones\\nDamage Increase 40%\\nPhysical Damage 100%\\nWeapon Damage 13 - 16\\nWeapon Speed 2.75s\\nStrength Requirement 20\\nTwo-handed Weapon\\nSkill Required: Swordsmanship\\nDurability 81 / 81","isPartialHue":false,"properties":[{"id":1023907,"order":1,"text":"Hatchet","values":[]},{"id":1060636,"order":2,"text":"Exceptional","values":[]},{"id":1072789,"order":3,"text":"Weight: ~1_WEIGHT~ Stones","values":[{"id":0,"order":0,"text":"4"}]},{"id":1060401,"order":4,"text":"Damage Increase ~1_val~%","values":[{"id":0,"order":0,"text":"40"}]},{"id":1060403,"order":5,"text":"Physical Damage ~1_val~%","values":[{"id":0,"order":0,"text":"100"}]},{"id":1061168,"order":6,"text":"Weapon Damage ~1_val~ - ~2_val~","values":[{"id":0,"order":0,"text":"13"},{"id":0,"order":1,"text":"16"}]},{"id":1061167,"order":7,"text":"Weapon Speed ~1_val~","values":[{"id":0,"order":0,"text":"2.75s"}]},{"id":1061170,"order":8,"text":"Strength Requirement ~1_val~","values":[{"id":0,"order":0,"text":"20"}]},{"id":1061171,"order":9,"text":"Two-handed Weapon","values":[]},{"id":1061172,"order":10,"text":"Skill Required: Swordsmanship","values":[]},{"id":1060639,"order":11,"text":"Durability ~1_val~ / ~2_val~","values":[{"id":0,"order":0,"text":"81"},{"id":0,"order":1,"text":"81"}]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('Hatchet');
    expect(sut.weight).to.equal(4); 
    expect(sut.durability?.lower).to.equal(81);
    expect(sut.durability?.upper).to.equal(81);    
    expect(sut.weaponDamage?.lower).to.equal(13);
    expect(sut.weaponDamage?.upper).to.equal(16);    
    expect(sut.magicLevel).to.equal(0);
    expect(sut.artifactLevel).to.equal(0);
    expect(sut.isExceptional).to.equal(true);
    expect(sut.hasNegativeStats).to.equal(false);    
    expect(sut.damageIncrease).to.equal(40);    
    expect(sut.states.includes('two-handed weapon'));
    expect(sut.weaponSpeed).to.equal(2.75);    
    expect(sut.skillRequired).to.equal('Swordsmanship');
    expect(sut.isInsured).to.equal(false);
  });


  it('Item - Cap Lesser Artifact', () => {
    const json = '{"serial":1646514304,"graphic":5909,"hue":0,"amount":1,"name":"Cap","data":"<b>Insured</b>\\nWeight: 1 Stone\\nPrized\\nStrength Bonus 3\\nIntelligence Bonus 3\\nMana Regeneration 1\\nLuck 150\\nEnhance Potions 5%\\nHit Chance Increase 3%\\nPhysical Resist 7%\\nFire Resist 5%\\nCold Resist 29%\\nPoison Resist 5%\\nEnergy Resist 5%\\nStrength Requirement 10\\nDurability 29 / 30\\n<BASEFONT COLOR=#A335EE>Lesser Artifact","isPartialHue":true,"properties":[{"id":1025909,"order":1,"text":"Cap","values":[]},{"id":1061682,"order":2,"text":"<b>Insured</b>","values":[]},{"id":1072788,"order":3,"text":"Weight: ~1_WEIGHT~ Stone","values":[{"id":0,"order":0,"text":"1"}]},{"id":1154910,"order":4,"text":"Prized","values":[]},{"id":1060485,"order":5,"text":"Strength Bonus ~1_val~","values":[{"id":0,"order":0,"text":"3"}]},{"id":1060432,"order":6,"text":"Intelligence Bonus ~1_val~","values":[{"id":0,"order":0,"text":"3"}]},{"id":1060440,"order":7,"text":"Mana Regeneration ~1_val~","values":[{"id":0,"order":0,"text":"1"}]},{"id":1060436,"order":8,"text":"Luck ~1_val~","values":[{"id":0,"order":0,"text":"150"}]},{"id":1060411,"order":9,"text":"Enhance Potions ~1_val~%","values":[{"id":0,"order":0,"text":"5"}]},{"id":1060415,"order":10,"text":"Hit Chance Increase ~1_val~%","values":[{"id":0,"order":0,"text":"3"}]},{"id":1060448,"order":11,"text":"Physical Resist ~1_val~%","values":[{"id":0,"order":0,"text":"7"}]},{"id":1060447,"order":12,"text":"Fire Resist ~1_val~%","values":[{"id":0,"order":0,"text":"5"}]},{"id":1060445,"order":13,"text":"Cold Resist ~1_val~%","values":[{"id":0,"order":0,"text":"29"}]},{"id":1060449,"order":14,"text":"Poison Resist ~1_val~%","values":[{"id":0,"order":0,"text":"5"}]},{"id":1060446,"order":15,"text":"Energy Resist ~1_val~%","values":[{"id":0,"order":0,"text":"5"}]},{"id":1061170,"order":16,"text":"Strength Requirement ~1_val~","values":[{"id":0,"order":0,"text":"10"}]},{"id":1060639,"order":17,"text":"Durability ~1_val~ / ~2_val~","values":[{"id":0,"order":0,"text":"29"},{"id":0,"order":1,"text":"30"}]},{"id":1042971,"order":18,"text":"~1_NOTHING~","values":[{"id":0,"order":0,"text":"<BASEFONT COLOR=#A335EE>Lesser Artifact"}]}]}';
    const stub = JSON.parse(json) as ObjectPropertyData;    
    const sut = new lib.ParsedOPL(stub);    
    expect(sut.name).to.equal('Cap');
    expect(sut.isInsured).to.equal(true);
    expect(sut.weight).to.equal(1); 
    expect(sut.durability?.lower).to.equal(29);
    expect(sut.durability?.upper).to.equal(30);
    expect(sut.magicLevel).to.equal(0);
    expect(sut.artifactLevel).to.equal(1);
    expect(sut.hasNegativeStats).to.equal(true);    
    expect(sut.physicalResist).to.equal(7); 
    expect(sut.fireResist).to.equal(5);
    expect(sut.coldResist).to.equal(29);
    expect(sut.poisonResist).to.equal(5);
    expect(sut.energyResist).to.equal(5);
    expect(sut.luck).to.equal(150);
    expect(sut.addedStr).to.equal(3);
    expect(sut.addedInt).to.equal(3);
    expect(sut.manaRegen).to.equal(1);
    expect(sut.hitChanceIncrease).to.equal(3);    
  });

});

// TODO: reconfigure the enums to use non-enum namespace definitions because the namespaced version of Skills doesn't work in UOC editor



