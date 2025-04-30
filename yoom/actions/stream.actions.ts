"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;


export const tokenProvider = async () => {
    const user = await currentUser();  // fetching user from Clerk

    if(!user) throw new Error("Not logged in");
    if(!apiKey) throw new Error("Missing API Key");
    if(!apiSecret) throw new Error("Missing API Secret");


    const Client = new StreamClient(apiKey, apiSecret);
    

    const expirationTime= Math.floor(Date.now() / 1000) + 3600; // valid for one hour
    const issuedAt = Math.floor(Date.now() / 1000) - 60;  // current time

    const token = Client.createToken(user.id, expirationTime, issuedAt);

    return token;
};


