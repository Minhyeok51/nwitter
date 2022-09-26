import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase"

function App() {
  const [init, setInit] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 지워도 됨 지우고 밑에서  변화
  const [userObj, setUserObj] = useState(null)
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        // setIsLoggedIn(true)
        setUserObj({
          // user를 다 가져오면 나중에 처리할때 문제생니까 필요한것만 빼오기
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args)=> user.updateProfile(args)
        })
      // }else {
        // setIsLoggedIn(false)
      }else {
        setUserObj(null)
      }
      setInit(true)
    })
  },[])
  const refreshUser=()=>{
    // console.log(authService.currentUser)
    const user = authService.currentUser
    setUserObj({
      // user를 다 가져오면 나중에 처리할때 문제생니까 필요한것만 빼오기
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(args)=> user.updateProfile(args)
    }) 
  }
  // console.log(authService.currentUser)
  // setInterval(()=>{
  //   console.log(authService.currentUser)
  // },2000)
  return (
    <>                          
    {init? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
    {/* isLoggedIn 스테이트 지우고  isLoggedIn에 불린값을 넣어줌. 초기형태=isLoggedIn={isLoggedIn}*/}
    </>
  );
}

export default App;
