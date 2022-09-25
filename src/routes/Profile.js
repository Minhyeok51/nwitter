import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

export default ()=>{
    const history = useHistory();    // useHistory -> 최신버전에선 사용할 수 없음
    const onLogOutClick =()=> {
        authService.signOut()
        history.push("/")
    }
    return(
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}