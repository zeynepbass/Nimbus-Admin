
import DetailsPage from "@/components/Shared/details"
export default async function Page({ params }) {
  const detailId=await params
  return <DetailsPage id={detailId.id}/>
}
