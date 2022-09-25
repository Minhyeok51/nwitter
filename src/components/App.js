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
        setUserObj(user)
      // }else {
        // setIsLoggedIn(false)
      }
      setInit(true)
    })
  },[])

  // console.log(authService.currentUser)
  // setInterval(()=>{
  //   console.log(authService.currentUser)
  // },2000)
  return (
    <>                          
    {init? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
    {/* isLoggedIn 스테이트 지우고  isLoggedIn에 불린값을 넣어줌. 초기형태=isLoggedIn={isLoggedIn}*/}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
