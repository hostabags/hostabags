import Search from "@/components/Search";
import Image from "next/image";
import HeroImage from "../../../public/images/bags.jpeg";

export default function HomePage() {
  return (
    <>
      <main className="homepage flex flex-col items-center justify-center px-6 py-10 text-center">
        <section className="hero-container flex flex-col md:flex-row items-center gap-10 max-w-6xl">
          <div className="w-full md:w-1/2">
            <Image
              src={HeroImage}
              alt="HostaBags. Tu espacio para equipaje"
              className="rounded-lg shadow-lg"
              width={500}
              height={300}
              priority
            />
          </div>

          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-normal">
              Tu espacio para equipaje.{" "}
              <span className="text-indigo-600">HostaBags</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Almacena tu equipaje de forma segura mientras exploras la ciudad.
              Encuentra anfitriones de confianza cerca de ti y reserva en
              segundo, porque tu aventura debería comenzar sin peso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Search />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
