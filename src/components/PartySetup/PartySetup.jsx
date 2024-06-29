import "../PartySetup/PartySetup.scss";
import { useState, useEffect } from "react";

function PartySetupComponent() {
  const [partyMembers, setPartyMembers] = useState(
    {
      name: "Party Member 1",
      level: 1,
    },
    {
      name: "Party Member 2",
      level: 1,
    }
  );

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };
  return (
    <section className="party-setup">
      <h1 className="party-setup__title">Adventuring Party</h1>

      <form className="party-setup__form" onSubmit={handleSubmit}>
        {partyMembers.map((element, index) => (
          <div className="party-setup__member" key={index}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={element.name || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <label>Level</label>
            <input
              type="number"
              name="level"
              value={element.level || ""}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
      </form>
    </section>
  );
}

export default PartySetupComponent;
