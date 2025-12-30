import Sidebar from "@/component/Shared/sidebar"
export default function Dashboard({children}){
    return(
        <>
        <Sidebar/>
        {children}
        </>
    )
}