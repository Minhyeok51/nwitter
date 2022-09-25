import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("진짜로 삭제할거야?");
    console.log(ok);
    if (ok) {
      // nweet삭제
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  //(prev) => !prev는 !false 와 같음
  const onSubmit =async(event)=>{
    event.preventDefault();
    // console.log(nweetObj, newNweet)
    await dbService.doc(`nweets/${nweetObj.id}`).update({
        text:newNweet
    })
    setEditing(false)
  }
  const onChange = (event)=>{
    const{
        target:{value},
    } = event;
    setNewNweet(value)
  }
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="nweet수정하기" value={newNweet} required />
            <input type="submit" value="Update Nweet"/>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
