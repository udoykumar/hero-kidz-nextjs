import Banner from "@/components/layouts/home/Banner";
import Products from "@/components/layouts/home/Products";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      {/* <p className="text-3xl text-primary">{JSON.stringify(session)}</p> */}
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </div>
  );
}
