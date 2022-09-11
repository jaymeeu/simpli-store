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
    // const [checking, setchecking] = useState(false)
    // const [refreshUser, setrefreshUser] = useState(false)

    const sub = authUser?.attributes?.sub

    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true }).then(setauthUser)
    }, [])

    useEffect(() => {
        // setchecking(true)

        DataStore.query(User, (user) => user.sub('eq', sub))
            .then((user) => {
                setDbuser(user[0])
                console.log(user[0], 'usersrsrsrs')
            })
            // .finally(() => setchecking(false))
    }, [sub])

    // const getFreshUser = () => {
    //     setrefreshUser(!refreshUser)
    // }
    return (

        <AuthContext.Provider
            value={{ authUser, dbUser, setDbuser, sub, 
                // checking, getFreshUser 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)