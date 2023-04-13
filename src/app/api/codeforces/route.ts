import { CodeforceUserStatus, doStatsOnUserStatus } from './[username]/route';

import { collection, doc, DocumentData, getDocs, setDoc } from 'firebase/firestore';
import { getUsers } from '@/app/api/route';
import { codeForceUserInfo, CodeForceUserStatus } from '@/utils/codeforcesquery';
import { M_PLUS_1 } from 'next/font/google';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/firebaseConfig';
export const dynamic = 'force-dynamic';
interface ResponseFromthis{
    id: string;
    data: CodeforceUserStatus[];
}
export async function GET(request: NextRequest) {
    const ref = collection(db, "codeforces-stat");
    const snapshot = await getDocs(ref);
    let user: ResponseFromthis[] = [];
    snapshot.forEach((doc) => {
        user.push({
            id: doc.id,
            data: doc.data() as CodeforceUserStatus[]
        });
    });
    const res = user.map((us) => {
        return {
            id: us.id,
            ...doStatsOnUserStatus(us.data)
        }
    });
    return NextResponse.json(res);
}

export async function postCodeForcesUserInfo() {
    let infoSheetProfile = getUsers();
    let s = "";
    let i = 0;
    let timeout: any;
    timeout = setInterval(async () => {
        if (i < infoSheetProfile.username.length) {
            let codeforce: string = infoSheetProfile.mp.get(infoSheetProfile.username[i])?.Codeforces.split("/").slice(-1)[0] as string;
            let data = await codeForceUserInfo(codeforce);
            setDoc(doc(db, "codeforces-info", codeforce), {
                id: codeforce,
                ...data.result
            })
            i++;
        } else if (i >= infoSheetProfile.username.length) {
            clearInterval(timeout);
        }
    }, 2000)
}
export async function postCodeForceStatData() {
    let infoSheetProfile = getUsers();
    let s = "";
    let i = 0;
    let timeout: any;
    timeout = setInterval(async () => {
        if (i < infoSheetProfile.username.length) {
            let codeforce: string = infoSheetProfile.mp.get(infoSheetProfile.username[i])?.Codeforces.split("/").slice(-1)[0] as string;
            let data = await CodeForceUserStatus(codeforce);
            setDoc(doc(db, "codeforces-stat", codeforce), {
                id: codeforce,
                ...data.result
            })
            i++;
        } else if (i >= infoSheetProfile.username.length) {
            clearInterval(timeout);
        }

    }, 2000)
}