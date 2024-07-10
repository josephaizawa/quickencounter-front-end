import "../MonsterStatBlock/MonsterStatBlock.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import fangsIcon from "../../assets/images/fangs.svg";
import Loading from "../Loading/Loading";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
const baseURL = import.meta.env.VITE_API_URL;

const MonsterStatBlock = () => {
  const [detailedMonsterList, setDetailedMonsterList] = useState([]);

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const selectedMonsterList = location.state || {};

  useEffect(() => {
    const fetchMonsterInfo = async () => {
      try {
        const requests = selectedMonsterList.map(async (monster) => {
          const monsterName = { name: monster.name };
          const response = await axios.post(
            `${baseURL}monsters/individual`,
            monsterName
          );

          return response.data;
        });

        const detailedMonsters = await Promise.all(requests);
        setDetailedMonsterList(detailedMonsters);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching monster data:", error);
        setLoading(false);
      }
    };

    fetchMonsterInfo();
  }, []);

  return (
    <>
      <main className="monster-list">
        <div className="monster-list__title-container">
          <div className="monster-list__header">
            <BackButton />
            <h1 className="monster-list__title">Monsters</h1>
            <RestartButton />
          </div>
          {loading && <Loading />}
        </div>
        <section className="monster-list_container">
          {detailedMonsterList.map((e, i) => {
            return (
              <div className="stat-block wide">
                <hr className="orange-border" />
                <div className="section-left">
                  <div className="creature-heading">
                    <div className="creature-image-block">
                      {e.image.monsterImage ? (
                        <img
                          className="creature-image"
                          src={e.image.monsterImage}
                        />
                      ) : (
                        <img
                          className="creature-image-default"
                          src={fangsIcon}
                        />
                      )}
                    </div>
                    <div className="creature-name-block">
                      <h1>{e.index}</h1>
                      <h2>
                        {e.size} {e.type}, {e.alignment}
                      </h2>
                    </div>
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
                  <h2 className="creature-heading-h2">Special Abilities</h2>
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
                      <p className="property-block-p">No Actions Available</p>
                    )}
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
                      <p className="property-block-p">
                        No Legendary Actions Available
                      </p>
                    )}
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
