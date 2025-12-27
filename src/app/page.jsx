import Banner from "@/components/layouts/home/Banner";
import Products from "@/components/layouts/home/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-20">
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </div>
  );
}
