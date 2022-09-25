import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase"

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true)
        setUserObj(user)
      }else {
        setIsLoggedIn(false)
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
    {init? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
