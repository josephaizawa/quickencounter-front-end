import "../MonsterStatBlock/MonsterStatBlock.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const MonsterStatBlock = () => {
  const [detailedMonsterList, setDetailedMonsterList] = useState([]);
  const [editedMonsterList, setEditedMonsterList] = useState([]);
  const location = useLocation();
  const selectedMonsterList = location.state || {};

  useEffect(() => {
    const fetchMonsterInfo = async () => {
      try {
        const requests = selectedMonsterList.map(async (monster) => {
          const monsterName = monster.name;
          const response = await axios.get(
            `https://www.dnd5eapi.co/api/monsters/${monsterName
              .replace(/ /g, "-")
              .toLowerCase()}`
          );
          return response.data;
        });

        const detailedMonsters = await Promise.all(requests);
        setDetailedMonsterList(detailedMonsters);
      } catch (error) {
        console.error("Error fetching monster data:", error);
      }
    };

    fetchMonsterInfo();
  }, []);

  useEffect(() => {
    const findEditedCR = (array1) => {
      const editedMonsters = [];

      for (let i = 0; i < array1.length; i++) {
        const selectedMonster = array1[i];
        const monsterCR = selectedMonster.cr;
        const monsterChallengeRating = selectedMonster.challenge_rating;
        if (monsterCR.toString() !== monsterChallengeRating.toString()) {
          editedMonsters.push(selectedMonster);
        }
      }

      setEditedMonsterList(editedMonsters);
    };
    findEditedCR(selectedMonsterList);
  }, []);

  useEffect(() => {
    const fetchEditedMonsterInfo = async () => {
      try {
        const requests = editedMonsterList.map(async (monster) => {
          const monsterName = monster.name;
          const response = await axios.get(
            `https://www.dnd5eapi.co/api/monsters/${monsterName
              .replace(/ /g, "-")
              .toLowerCase()}`
          );
          return response.data;
        });

        const editedMonsters = await Promise.all(requests);
        setEditedMonsterList(editedMonsters);
      } catch (error) {
        console.error("Error fetching monster data:", error);
      }
    };

    if (editedMonsterList.length > 0) {
      fetchEditedMonsterInfo();
    }
  }, []);

  console.log(editedMonsterList);
  console.log(detailedMonsterList);
  console.log(selectedMonsterList);

  return (
    <>
      <main className="monster-list">
        <div className="monster-list__title-container">
          <h1 className="monster-list__title">Monsters</h1>
        </div>
        <section className="monster-list_container">
          {detailedMonsterList.map((e, i) => {
            return (
              <div className="stat-block wide">
                <hr className="orange-border" />
                <div className="section-left">
                  <div className="creature-heading">
                    <div className="creature-image-block">
                      {e.image && (
                        <img
                          className="creature-image"
                          src={`https://www.dnd5eapi.co${e.image}`}
                        />
                      )}
                    </div>

                    <h1>{e.index}</h1>
                    <h2>
                      {e.size} {e.type}, {e.alignment}
                    </h2>
                  </div>
                  <svg height="5" width="100%" className="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                  </svg>
                  <div className="top-stats">
                    <div className="property-line first">
                      <h4>Armor Class</h4>
                      <p>
                        {e.armor_class[0]?.value} ({e.armor_class[0]?.type})
                      </p>
                    </div>
                    <div className="property-line">
                      <h4>Hit Points</h4>
                      <p>
                        {e.hit_points} ({e.hit_dice})
                      </p>
                    </div>
                    <div className="property-line last">
                      <h4>Speed</h4>
                      {e.speed.walk && <p>Walk {e.speed.walk}</p>}
                      {e.speed.swim && <p>Swim {e.speed.swim}</p>}
                      {e.speed.fly && <p>Fly {e.speed.fly}</p>}
                      {e.speed.burrow && <p>Burrow {e.speed.burrow}</p>}
                      {e.speed.climb && <p>Climb {e.speed.climb}</p>}
                    </div>
                    <svg height="5" width="100%" className="tapered-rule">
                      <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    <div className="abilities">
                      <div className="ability-strength">
                        <h4>STR</h4>
                        <p>
                          {e.strength} ({Math.floor((e.strength - 10) / 2)})
                        </p>
                      </div>
                      <div className="ability-dexterity">
                        <h4>DEX</h4>
                        <p>
                          {e.dexterity} ({Math.floor((e.dexterity - 10) / 2)})
                        </p>
                      </div>
                      <div className="ability-constitution">
                        <h4>CON</h4>
                        <p>
                          {e.constitution} (
                          {Math.floor((e.constitution - 10) / 2)})
                        </p>
                      </div>
                      <div className="ability-intelligence">
                        <h4>INT</h4>
                        <p>
                          {e.intelligence} (
                          {Math.floor((e.intelligence - 10) / 2)})
                        </p>
                      </div>
                      <div className="ability-wisdom">
                        <h4>WIS</h4>
                        <p>
                          {e.wisdom} ({Math.floor((e.wisdom - 10) / 2)})
                        </p>
                      </div>
                      <div className="ability-charisma">
                        <h4>CHA</h4>
                        <p>
                          {e.charisma} ({Math.floor((e.charisma - 10) / 2)})
                        </p>
                      </div>
                    </div>
                    <svg height="5" width="100%" className="tapered-rule">
                      <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    {e.proficiencies && e.proficiencies.length > 0 && (
                      <div className="property-line">
                        <h4>Proficiencies</h4>
                        {e.proficiencies.map((proficiency) => (
                          <p>
                            {proficiency.proficiency.name}
                            :&nbsp;
                            {proficiency.value}
                          </p>
                        ))}
                      </div>
                    )}
                    {/* <div className="property-line first">
                      <h4>Saving Throws</h4>
                      <p>
                        {e.proficiencies[0]?.proficiency.name ?? "N/A"}:&nbsp;
                        {e.proficiencies[0]?.value ?? "N/A"}
                      </p>
                      <p>
                        {e.proficiencies[1]?.proficiency.name ?? "N/A"}:&nbsp;
                        {e.proficiencies[1]?.value ?? "N/A"}
                      </p>
                      <p>
                        {e.proficiencies[2]?.proficiency.name ?? "N/A"}:&nbsp;
                        {e.proficiencies[2]?.value ?? "N/A"}
                      </p>
                    </div>
                    <div className="property-line">
                      <h4>Skills</h4>
                      <p>
                        {e.proficiencies[3]?.proficiency.name ?? "N/A"}:&nbsp;
                        {e.proficiencies[3]?.value ?? "N/A"}
                      </p>
                      <p>
                        {e.proficiencies[4]?.proficiency.name ?? "N/A"}:&nbsp;
                        {e.proficiencies[4]?.value ?? "N/A"}
                      </p>
                    </div> */}
                    {e.damage_vulnerabilities &&
                      e.damage_vulnerabilities.length > 0 && (
                        <div className="property-line">
                          <h4>Damage Vulnerabilities</h4>
                          {e.damage_vulnerabilities.map((vulnerability) => (
                            <p>{vulnerability.value}</p>
                          ))}
                        </div>
                      )}
                    {e.damage_resistances &&
                      e.damage_resistances.length > 0 && (
                        <div className="property-line">
                          <h4>Damage Resistances</h4>
                          {e.damage_resistances.map((resistance) => (
                            <p>{resistance.value}</p>
                          ))}
                        </div>
                      )}
                    {e.damage_immunities && e.damage_immunities.length > 0 && (
                      <div className="property-line">
                        <h4>Damage Immunities</h4>
                        {e.damage_immunities.map((immunity) => (
                          <p>{immunity}</p>
                        ))}
                      </div>
                    )}
                    {e.condition_immunities &&
                      e.condition_immunities.length > 0 && (
                        <div className="property-line">
                          <h4>Condition Immunities</h4>
                          {e.condition_immunities.map((immunity) => (
                            <p>{immunity.name}</p>
                          ))}
                        </div>
                      )}
                    {/* <div className="property-line">
                      <h4>Damage Vulnerabilities</h4>
                      <p>{e.damage_vulnerabilities[0]?.value ?? "N/A"}</p>
                      <p>{e.damage_vulnerabilities[1]?.value ?? "N/A"}</p>
                    </div>
                    <div className="property-line">
                      <h4>Damage Resistances</h4>
                      <p>{e.damage_resistances || "N/A"}</p>
                    </div>
                    <div className="property-line">
                      <h4>Damage Immunities</h4>
                      <p>{e.damage_immunities || "N/A"}</p>
                    </div>
                    <div className="property-line">
                      <h4>Condition Immunities</h4>
                      <p>{e.condition_immunities[0]?.name ?? "N/A"}</p>
                      <p>{e.condition_immunities[1]?.name ?? "N/A"}</p>
                      <p>{e.condition_immunities[2]?.name ?? "N/A"}</p>
                    </div> */}
                    <div className="property-line">
                      <h4>Senses</h4>
                      {e.senses.blindsight && (
                        <p>blindsight: {e.senses.blindsight}</p>
                      )}
                      {e.senses.darkvision && (
                        <p>darkvision: {e.senses.darkvision}</p>
                      )}
                      {e.senses.passive_perception && (
                        <p>Passive perception: {e.senses.passive_perception}</p>
                      )}
                    </div>
                    <div className="property-line">
                      <h4>Languages</h4>
                      <p>{e.languages || "N/A"}</p>
                    </div>
                    <div className="property-line last">
                      <h4>Challenge</h4>
                      <p>
                        {e.challenge_rating || "N/A"} ({e.xp} XP)
                      </p>
                    </div>
                  </div>
                  <svg height="5" width="100%" className="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                  </svg>
                  <h3>Special Abilities</h3>
                  {e.special_abilities && e.special_abilities.length > 0 ? (
                    e.special_abilities.map((ability) => (
                      <div className="property-block">
                        <h4>{ability.name}</h4>:&nbsp;
                        <p>{ability.desc}</p>
                      </div>
                    ))
                  ) : (
                    <p>No Actions Available</p>
                  )}
                  {/* <div className="property-block">
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
            ock */}
                </div>
                <div className="actions">
                  <div className="section-right">
                    <h3>Actions</h3>
                    {e.actions && e.actions.length > 0 ? (
                      e.actions.map((action) => (
                        <div className="property-block">
                          <h4>{action.name}</h4>:&nbsp;
                          <p>{action.desc}</p>
                        </div>
                      ))
                    ) : (
                      <p>No Actions Available</p>
                    )}
                    {/* <div className="property-block">
                      <h4>Multiattack.</h4>
                      <p>The armor makes two melee attacks.</p>
                    </div>
                    <div className="property-block">
                      <h4>Slam.</h4>
                      <p>
                        <i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one
                        target.
                        <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.
                      </p>
                    </div> */}
                  </div>
                  <div className="actions">
                    <h3>Legendary Actions</h3>
                    {e.legendary_actions && e.legendary_actions.length > 0 ? (
                      e.legendary_actions.map((action) => (
                        <div className="property-block">
                          <h4>{action.name}</h4>:&nbsp;
                          <p>{action.desc}</p>
                        </div>
                      ))
                    ) : (
                      <p>No Legendary Actions Available</p>
                    )}

                    {/* <div className="property-block">
                      <h4>Multiattack.</h4>
                      <p>The armor makes two melee attacks.</p>
                    </div>
                    <div className="property-block">
                      <h4>Slam.</h4>
                      <p>
                        <i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one
                        target.
                        <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.
                      </p>
                    </div> */}
                  </div>
                </div>
                <hr className="orange-border bottom" />
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default MonsterStatBlock;
