import { nanoid } from 'nanoid';


export const getShortenUrl = (url) => {
    // generate random number to generate short id of differnet length
    const randomNum = Math.floor(Math.random() * (15 - 7) + 7)
    const shortId = nanoid(randomNum);
    return {
        shortedUrl: `${process.env.BASE_URL}/api/v1/urls/${shortId}`,
        shortId
    };
}