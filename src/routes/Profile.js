import { authService, dbService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default ({ userObj, refreshUser }) => {
  const history = useHistory(); // {/* Redirect,history 최신버전 리액트에서는 못씀 이것대신에 useNavigation 사용해야함 */}
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser(); //App.js에서 넘어온 함수. firebase에서 데이터 바뀐후 이 함수가 profile을 새로고침해줌
    }
  };
  // const getMyNweets = async () => {
  //   const nweets = await dbService
  //     .collection("nweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();
  //   console.log(nweets.docs.map((doc) => doc.data()));
  // };
  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          autoFocus
          placeholder="Display name"
          className="formInput"
        />
        <input type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}/>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
