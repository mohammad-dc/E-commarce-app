import Nexmo  from "@vonage/server-sdk";
import config from "../config/config";

export const sendSMS = (to: string, text: string) => {
    const nexmo = new Nexmo({
    apiKey: config.server.nexmo.publicKey,
    apiSecret: config.server.nexmo.secretKey,
    });

    const from = 'Kiwi';
    nexmo.message.sendSms(from, to, text, {type: 'unicode'}, (error, responseData) =>{
        error? console.log(error) : console.log(responseData);
    });
}