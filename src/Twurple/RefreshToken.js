import { RefreshingAuthProvider, ClientCredentialsAuthProvider } from '@twurple/auth';
import DBUserInfo from '../DB/DBUserInfo';
import TwitchKey from '../private/TwitchKey';

const GetauthProvider = async (userID)=>{
    const tokenData = await DBUserInfo.GetUserToken(userID);    
    return new RefreshingAuthProvider({
        clientId: TwitchKey.clientId,
        clientSecret: TwitchKey.clientSecret,
        onRefresh: async (newTokenData) => { //console.log(newTokenData); 
            await DBUserInfo.SetUserToken(newTokenData, userID);
        }
    },
    tokenData
    );
}

const authProvider = new ClientCredentialsAuthProvider(TwitchKey.clientId, TwitchKey.clientSecret);

export  {authProvider, GetauthProvider};