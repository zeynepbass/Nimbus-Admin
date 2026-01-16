import StatCard from "@/components/ui/statCard";
import Charts from "@/components/widgets/Charts/SalesChart";
import { SuppliersList } from "@/components/widgets/Dashboards/SuppliersList";
import { SeparatorDemo } from "@/components/widgets/Dashboards/Seperator";
export default function Hero({mostSoldProducts, user,orders,totalCiro,activeCount,criticalCount,filtreredName }) {
    return (
    <div className="col-span-12 relative h-40 xl:col-span-9  space-y-8 ">
         <div
           className=" h-40 rounded-xl bg-cover bg-center overflow-hidden"
           style={{
             backgroundImage: "url('/images/wave-haikei.png')",
           }}
         >
           <img
             src="/images/curve-rafiki.png"
             alt="Welcome illustration"
             className="absolute -top-[80px] left-0 w-70 h-70 z-50  pointer-events-none"
           />
 
           <div className="relative z-10 h-full flex flex-col justify-center pl-75 pr-6">
             <span className="text-sm text-white/80">Hoş geldin 👋</span>
 
             <h2 className="text-xl md:text-2xl font-semibold text-white">
               {user.name}
             </h2>
 
             <p className="text-sm text-white/70 mt-1">
               <span className="font-bold text-xl">Doğru yoldasınız!</span>
               <br />
               Son faaliyetleriniz tutarlı ilerleme ve güçlü bir katılım
               gösteriyor.
               <br />
               Geliştirmeye, iyileştirmeye ve sınırlarınızı zorlamaya devam edin;
               sonuçlar giderek artıyor.
             </p>
           </div>
         </div>
 
         <div className="space-y-4 min-h-screen">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <StatCard title="Toplam Ürün" value={orders.length} />
             <StatCard title="Toplam Ciro" value={`₺${totalCiro}`} />
             <StatCard title="Aktif Ürünler" value={activeCount} />
             <StatCard title="Kritik Stok" value={criticalCount} />
           </div>
 
           <div className="bg-zinc-100 rounded-2xl shadow-sm">
             <h3 className="text-sm font-bold text-gray-600 mb-4">
               SATIŞ GRAFİĞİ
             </h3>
             <Charts orders={orders} />
           </div>
 
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 " >
             <div className="bg-zinc-100 rounded-2xl shadow-sm">
               <SuppliersList suppliers={filtreredName} />
             </div>
 
             <div className="bg-zinc-100 rounded-2xl shadow-sm p-5">
               <SeparatorDemo data={mostSoldProducts} />
             </div>
           </div>
 
 
         </div>
       </div>
    );
  }
  