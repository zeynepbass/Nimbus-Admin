
import DetailsPage from "@/components/Shared/Orders/tableOrderDetails"
export default async function Page({ params }) {
  const detailId=await params
  return <DetailsPage id={detailId.id}/>
}
