import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import ProfileDetail from "@/app/(dashboard)/profile/components/profile-detail";
import {authOptions} from "@/lib/authOptions";

export default async function Profile(){
    const session = await getServerSession(authOptions as any);
    if (!session){
        redirect("/login")
    }
    return <ProfileDetail/>
}