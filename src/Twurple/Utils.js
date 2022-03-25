import {authProvider, GetauthProvider} from './RefreshToken'
import { ApiClient } from '@twurple/api';
import { ChatClient } from '@twurple/chat';

const apiClient = new ApiClient({ authProvider });

async function isStreamLive(userName) {
	const user = await apiClient.users.getUserByName(userName);
	if (!user) {
		return false;
	}
	return await user.getStream() !== null;
}


async function GetUserStream(userName) {
	const user = await apiClient.users.getUserByName(userName);	
	return user;
}

async function GetChatClient(userid, userName){
    let refreshToken = await GetauthProvider(userid);
	const Client = new ChatClient({authProvider: refreshToken, channels: [userName] });		
    return Client; 	
}

export {isStreamLive, GetUserStream, GetChatClient}