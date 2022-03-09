import FireDB from "../DB/FireDB";
import { getAuth } from "firebase/auth";
import { db } from "../main";
import { doc, collection } from "firebase/firestore";
const TMIConfig = "TMIConfig";
const DBUserInfo = {
    async SetInfoTMI(data) {        
        const UserI = getAuth().currentUser;
        let userID = UserI.uid;
        if(typeof userID != "undefined"){
            const colref = collection(db, userID);
            let docref = doc(colref, TMIConfig); 
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
            let docref = doc(colref, TMIConfig); 
           return await FireDB.Get(docref);
        }else{
            console.error("No se encontro nada");
        }    
    }
};

export default DBUserInfo;