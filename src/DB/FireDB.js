import { doc, setDoc, getDoc  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../main";
const UserID = getAuth().currentUser.uid;
const FireDB = {
    async Get(path){
      try {
        return await (await getDoc(doc(db, UserID, path))).data();        
      } catch (ex) {
        console.error(ex);
      }
    },
    async Add( path, data ){
        return  await setDoc(doc(db, UserID , path), data)
          .then(() => {
            console.log("Documento añadido");
          })
          .catch(function(ex) {
            console.error("Error al añadir el documento: ", ex);
          });
    },
};

export default FireDB;