import "../Profile/Profile.scss";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import editButton from "../../assets/icons/edit-24px.svg";
import axios from "axios";
import EditProfile from "../EditProfile/EditProfile";
const baseURL = import.meta.env.VITE_API_URL;

function ProfileComponent() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMonsterList, setSelectedMonsterList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");

      if (!token) {
        return setFailedAuth(true);
      }

      try {
        const { data } = await axios.get(`${baseURL}users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);

        try {
          const response1 = await axios.post(`${baseURL}party/individual`, {
            id: userId,
          });
          const party = response1.data;

          if (party && party.id) {
            sessionStorage.setItem("partyId", party.id);
            const partyId = sessionStorage.getItem("partyId");

            const response = await axios.post(
              `${baseURL}monsters/savedMonsters`,
              { id: partyId }
            );

            setSelectedMonsterList(response.data);
          } else {
            setSelectedMonsterList([]);
          }
        } catch (partyError) {
          console.error("Error fetching party data:", partyError);

          setSelectedMonsterList([]);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, [isEditing]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <>
        <div className="profile-background">
          <main className="profile__app-window">
            <nav className="nav">
              <BackButton />
              <RestartButton />
            </nav>
            <h1 className="profile__title">
              Log in to see profile info and saved encounters.
            </h1>
            <div className="signin-options">
              <div className="signin-options__container">
                <h2 className="signin-options__title">
                  Don't have an account?
                </h2>
                <Link className="signin-options__button-link" to="/signin">
                  <div className="signin-options__button">
                    <p className="signin-options__button-start">Sign In</p>
                  </div>
                </Link>
              </div>
              <div className="signin-options__container">
                <h2 className="signin-options__title">
                  Already have an account?
                </h2>
                <Link className="signin-options__button-link" to="/login">
                  <div className="signin-options__button">
                    <p className="signin-options__button-start">Log in</p>
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <main className="Profile">
        <p>Loading...</p>
      </main>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const renderEdit = () => (
    <div>
      <EditProfile setIsEditing={setIsEditing} />
    </div>
  );
  if (isEditing) return renderEdit();
  return (
    <>
      <div className="profile-background">
        <main className="profile__app-window">
          <nav className="nav">
            <BackButton />
            <RestartButton />
          </nav>

          <section className="profile">
            <h2 className="profile__welcome">
              Welcome back, {user.first_name} {user.last_name}
            </h2>
            <div className="profile__info-header">
              <h2 className="profile__title">Profile</h2>
              <img
                className="profile__edit-button"
                src={editButton}
                onClick={handleEdit}
              />
            </div>
            <section className="profile__fields">
              <p className="profile__lable">First Name: {user.first_name}</p>
              <p className="profile__lable">Last Name: {user.last_name}</p>
              <p className="profile__lable">Email: {user.email}</p>
              <p className="profile__lable">Phone: {user.phone}</p>
              <p className="profile__lable">Address: {user.address}</p>
              <p className="profile__lable">You are a {user.role} </p>
            </section>
          </section>
          <section className="profile-monster-save">
            <Link
              className="profile-monster-save__button-link"
              to="/monsterlist"
              state={selectedMonsterList}
            >
              <div className="profile-monster-save__container">
                <h2 className="profile-monster-save__title">Monster Save</h2>
                <p className="profile-monster-save__instructions">
                  click to load
                </p>
                <ul className="profile-monster-save__list">
                  {selectedMonsterList.map((monster) => {
                    return (
                      <li className="profile-monster-save__item">
                        {monster.name}, cr: {monster.cr}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Link>
          </section>
          <button className="profile__logout" onClick={handleLogout}>
            Log out
          </button>
        </main>
      </div>
    </>
  );
}

export default ProfileComponent;
