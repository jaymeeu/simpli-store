import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { Auth, DataStore } from 'aws-amplify'
import { User } from "./../models";


const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [authUser, setauthUser] = useState(null)
    const [dbUser, setDbuser] = useState(null)

    const sub = authUser?.attributes?.sub

    useEffect(() => {
        checker()
    }, [])

    const checker = async () =>{
        //get authenticated user information
        await Auth.currentAuthenticatedUser({ bypassCache: true }).then( async (res)=>{
            setauthUser(res)
            //query user information from database
            await DataStore.query(User, (user) => user.sub('eq', res?.attributes?.sub))
                .then((user) => {
                    setDbuser(user[0])
                })
        })
    }

    return (

        <AuthContext.Provider
            value={{ authUser, dbUser, setDbuser, sub, 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)