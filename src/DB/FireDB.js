import {setDoc, getDoc  } from "firebase/firestore";
const FireDB = {
    async Get(collectionRef){
      try {
        const res = await getDoc(collectionRef);    
        if(res.exists()){
          return res.data();
        }else{          
          return undefined;
        }        
      } catch (ex) {
        console.error(ex);
      }
    },
    async Set(collectionRef, data ){
      try {
        await setDoc(collectionRef, data);        
        return true;
      } catch (ex) {
        console.error(ex);
        return false;
      }  
    },
};

export default FireDB;