import Image from "next/image";
import LoginForm  from "@/components/Shared/login";

const Page = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      

      <div className="relative hidden md:block">
        <Image
          src="/images/wallpaper.jpg"   
          alt="Login image"
          fill
          className="object-cover"
          priority
        />
      </div>


      <div className="flex items-center justify-center">
        <LoginForm />
      </div>

    </div>
  );
};

export default Page;
