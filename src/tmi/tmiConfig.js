import DBUserInfo from '../DB/DBUserInfo'

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
    Get: async (userID = null) =>{
        let data = await DBUserInfo.GetInfoTMI(userID);
        if(typeof data != "undefined")
            tmiConfig = data;
       return tmiConfig;
    }
};


export { tmiManager, tmiConfig};