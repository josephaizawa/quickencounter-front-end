import "../MonsterStatBlock/MonsterStatBlock.scss";

const MonsterStatBlock = ({ selectedMonster }) => {
  console.log(selectedMonster.speed.walk);
  return (
    <>
      <div className="stat-block wide">
        <hr className="orange-border" />
        <div className="section-left">
          <div className="creature-heading">
            <h1>{selectedMonster.index}</h1>
            <h2>
              {selectedMonster.size} {selectedMonster.type},{" "}
              {selectedMonster.alignment}
            </h2>
          </div>
          <svg height="5" width="100%" className="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div className="top-stats">
            <div className="property-line first">
              <h4>Armor Class</h4>
              <p>
                {selectedMonster.armor_class[0].value} (
                {selectedMonster.armor_class[0].type})
              </p>
            </div>
            <div className="property-line">
              <h4>Hit Points</h4>
              <p>
                {selectedMonster.hit_points} ({selectedMonster.hit_dice})
              </p>
            </div>
            <div className="property-line last">
              <h4>Speed</h4>
              <p>Walk {selectedMonster.speed.walk}</p>
              <p>Swim {selectedMonster.speed.swim}</p>
            </div>
            <svg height="5" width="100%" className="tapered-rule">
              <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="abilities">
              <div className="ability-strength">
                <h4>STR</h4>
                <p>
                  {selectedMonster.strength} (
                  {Math.floor((selectedMonster.strength - 10) / 2)})
                </p>
              </div>
              <div className="ability-dexterity">
                <h4>DEX</h4>
                <p>
                  {selectedMonster.dexterity} (
                  {Math.floor((selectedMonster.dexterity - 10) / 2)})
                </p>
              </div>
              <div className="ability-constitution">
                <h4>CON</h4>
                <p>
                  {selectedMonster.constitution} (
                  {Math.floor((selectedMonster.constitution - 10) / 2)})
                </p>
              </div>
              <div className="ability-intelligence">
                <h4>INT</h4>
                <p>
                  {selectedMonster.intelligence} (
                  {Math.floor((selectedMonster.intelligence - 10) / 2)})
                </p>
              </div>
              <div className="ability-wisdom">
                <h4>WIS</h4>
                <p>
                  {selectedMonster.wisdom} (
                  {Math.floor((selectedMonster.wisdom - 10) / 2)})
                </p>
              </div>
              <div className="ability-charisma">
                <h4>CHA</h4>
                <p>
                  {selectedMonster.charisma} (
                  {Math.floor((selectedMonster.charisma - 10) / 2)})
                </p>
              </div>
            </div>
            <svg height="5" width="100%" className="tapered-rule">
              <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="property-line first">
              <h4>Damage Immunities</h4>
              <p>poison, psychic</p>
            </div>
            <div className="property-line">
              <h4>Condition Immunities</h4>
              <p>
                blinded, charmed, deafened, exhaustion, frightened, petrified,
                poisoned
              </p>
            </div>
            <div className="property-line">
              <h4>Senses</h4>
              <p>
                blindsight 60ft. (blind beyond this radius), passive Perception
                6
              </p>
            </div>
            <div className="property-line">
              <h4>Languages</h4>
              <p>&mdash;</p>
            </div>
            <div className="property-line last">
              <h4>Challenge</h4>
              <p>1 (200 XP)</p>
            </div>
          </div>
          <svg height="5" width="100%" className="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div className="property-block">
            <h4>Antimagic Suceptibility.</h4>
            <p>
              The armor is incapacitated while in the area of an{" "}
              <i>antimagic field</i>. If targeted by <i>dispel magic</i>, the
              armor must succeed on a Constitution saving throw against the
              caster’s spell save DC or fall unconscious for 1 minute.
            </p>
          </div>{" "}
          ock
          <div className="property-block">
            <h4>False Appearance.</h4>
            <p>
              While the armor remains motionless, it is indistinguishable from a
              normal suit of armor.
            </p>
          </div>{" "}
          ock
        </div>
        <div className="section-right">
          <div className="actions">
            <h3>Actions</h3>
            <div className="property-block">
              <h4>Multiattack.</h4>
              <p>The armor makes two melee attacks.</p>
            </div>
            <div className="property-block">
              <h4>Slam.</h4>
              <p>
                <i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
                <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.
              </p>
            </div>
          </div>
          <div className="actions">
            <h3>Legendary Actions</h3>
            <div className="property-block">
              <h4>Multiattack.</h4>
              <p>The armor makes two melee attacks.</p>
            </div>
            <div className="property-block">
              <h4>Slam.</h4>
              <p>
                <i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
                <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.
              </p>
            </div>
          </div>
        </div>
        <hr className="orange-border bottom" />
      </div>
    </>
  );
};

export default MonsterStatBlock;
