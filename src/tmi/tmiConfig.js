import FirePaths  from "../DB/FirePaths";
import FireDB  from "../DB/FireDB";

let tmiConfig = {
        options: { debug: true, messagesLogLevel: "info" },
        connection: {
            reconnect: true,
            secure: true
        },
        identity: {
            username: '',
            password: ''
        },
        channels: [  ]    
};
const tmiManager = {
    Get: async () =>{
        let data = await FireDB.Get(FirePaths.UserInfo);
        tmiConfig = data;
       return tmiConfig;
    }
};


export { tmiManager, tmiConfig};