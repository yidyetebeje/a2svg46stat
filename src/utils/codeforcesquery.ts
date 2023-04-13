import crypto from "crypto"
export const apiKey = "44cfcb065b39a1d98756b6d4335dacfb1274be38";
export const secret = "0ce71e2af1be124c5f1c5d45a3ebef42dcc24a92";
export async function codeForceUserInfo(username: string) {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`, {
        'cache': 'no-store',
    })
    const data = await response.json()
    return data;
}
export async function CodeForceUserStatus(username: string) {
    const baseUrl = `https://codeforces.com/api/user.status?handle=${username}`;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const start = 123456;
    const apiSign = `${start}/user.status?apiKey=${apiKey}&handle=${username}&time=${timestamp}#${secret}`;
    let hash = crypto.createHash('sha512').update(apiSign).digest('hex');
    const response = await fetch(`${baseUrl}&apiKey=${apiKey}&time=${timestamp}&apiSig=${start}${hash}`, {
        'cache': 'no-store',
    })
    const data = await response.json()
    return data;
}
export async function CodeForceUserRating(username: string) {
    const response = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`, {
        'cache': 'no-store',
    })
    const data = await response.json()
    return data;
}
export async function ContestStanding(contestId: string) {
    const from = 1;
    const count = 300;
    const showUnofficial = false;
    const base_url = `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=${from}&count=${count}&showUnofficial=${showUnofficial}`;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const start = 123456;
    const apiSign = `${start}/contest.standings?apiKey=${apiKey}&contestId=${contestId}&count=${count}&from=${from}&showUnofficial=${showUnofficial}&time=${timestamp}#${secret}`;
    const apiSig = crypto.createHash('sha512').update(apiSign).digest('hex');
    const url = `${base_url}&apiKey=${apiKey}&time=${timestamp}&apiSig=${start}${apiSig}`;
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
    });
    const data = await response.json();
    return data;
}
