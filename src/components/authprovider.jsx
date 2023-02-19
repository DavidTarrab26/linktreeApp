import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, getUserInfo, registerNewUser, userExists } from "../firebase/firebase";
import {useNavigate} from "react-router-dom"

export default function Authprovider ({children, onUserLogin, onUserNotLogin, onUserNotRegister}) {
        const navigate = useNavigate()
        useEffect(()=>{
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const isRegistered = await userExists(user.uid)
                if (isRegistered) {
                    const userInfo = await getUserInfo(user.uid)
                    if(userInfo.processCompleted){
                        onUserLogin(userInfo)
                    }else{
                        onUserNotRegister(userInfo)
                    }
                } else{
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: '',
                        username: '',
                        processCompleted: false,
                    })
                    onUserNotRegister(user)
                }
                }else{
                    onUserNotLogin(user)
                }
            })
        },[navigate, onUserLogin, onUserNotLogin, onUserNotRegister])
        
        return(
            <div>{children}</div>
        )
    }