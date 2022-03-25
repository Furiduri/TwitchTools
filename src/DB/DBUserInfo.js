import FireDB from "../DB/FireDB";
import { getAuth } from "firebase/auth";
import { db } from "../main";
import { doc, collection } from "firebase/firestore";
const tblTMIConfig = "TMIConfig";
const tblUserInfo = "UserInfo";
const tblUserToken = "UserToken";

const DBUserInfo = {
    async SetUserToken(TokenData, userID = null){        
        
        if(userID == null){
            const UserI = getAuth().currentUser;
            userID = UserI.uid;
        }

        if(typeof userID != "undefined"){    

            let formart = TokenData;
            if(typeof TokenData["access_token"] != 'undefined'){
                formart = {
                    "accessToken":  TokenData["access_token"] ,
                    "refreshToken": TokenData["refresh_token"],
                    "expiresIn": TokenData["expires_in"],
                    "obtainmentTimestamp": 0
                };       
            }
            localStorage.setItem(tblUserToken,JSON.stringify( formart));
            const colref = collection(db, userID);
            let docref = doc(colref, tblUserToken); 
          return await  FireDB.Set(docref, formart);
        }else{
            console.error("Usuario no logeado");
        }     
    },
    async GetUserToken(userID){
        let res = localStorage.getItem(tblUserToken);
        if(res != null)
            return JSON.parse(res);

        if(userID == null){
            const UserI = getAuth().currentUser;
            userID = UserI.uid;
        }

        if(typeof userID != "undefined"){
            const colref = collection(db, userID);
            let docref = doc(colref, tblUserToken); 
            let res = await FireDB.Get(docref);
            localStorage.setItem(tblUserToken,JSON.stringify(res));
            return res;
        }else{
            console.error("No se encontro nada");
        }     
    },
    async SetInfoChanel(infoChanel){
        const UserI = getAuth().currentUser;
        let userID = UserI.uid;
        if(typeof userID != "undefined"){           
            localStorage.setItem(tblUserInfo,JSON.stringify( infoChanel));
            const colref = collection(db, userID);
            let docref = doc(colref, tblUserInfo); 
          return await  FireDB.Set(docref, infoChanel);
        }else{
            console.error("Usuario no logeado");
        }
    },
    async GetInfoChanel(userID = null){
        let infoLocal = localStorage.getItem(tblUserInfo);
        if(infoLocal != null)
            return JSON.parse(infoLocal);

        if(userID == null){
            const UserI = getAuth().currentUser;
            userID = UserI.uid;
        }

        if(typeof userID != "undefined"){
            const colref = collection(db, userID);
            let docref = doc(colref, tblUserInfo); 
            let res = await FireDB.Get(docref);
            localStorage.setItem(tblUserInfo,JSON.stringify(res));
            return res;
        }else{
            console.error("No se encontro nada");
        }    
    },
    async SetInfoTMI(data) {        
        const UserI = getAuth().currentUser;
        let userID = UserI.uid;
        if(typeof userID != "undefined"){
            const colref = collection(db, userID);
            let docref = doc(colref, tblTMIConfig); 
          return await  FireDB.Set(docref, data);
        }else{
            console.error("Usuario no logeado");
        }
    },
    async GetInfoTMI(userID = null){
        if(userID == null){
            const UserI = getAuth().currentUser;
            userID = UserI.uid;
        }

        if(typeof userID != "undefined"){
            const colref = collection(db, userID);
            let docref = doc(colref, tblTMIConfig); 
           return await FireDB.Get(docref);
        }else{
            console.error("No se encontro nada");
        }    
    }
};

export default DBUserInfo;