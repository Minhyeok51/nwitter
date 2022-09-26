import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text); //input값 수정하기
  const onDeleteClick = async () => {
    const ok = window.confirm("진짜로 삭제할거야?");
    // console.log(ok);
    if (ok) {
      // nweet삭제
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete()
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  //(prev) => !prev는 !false 와 같음
  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(nweetObj, newNweet)
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              type="text"
              placeholder="nweet수정하기"
              value={newNweet}
              autoFocus
              required
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn"/>
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {/* isOwner 가 true면 &&뒤에것 보여주기 */}
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl}/>}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
