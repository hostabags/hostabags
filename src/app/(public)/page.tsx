import Header from "@/components/layout/header/Header";
import Search from "@/components/Search";
import Image from 'next/image';
import HeroImage from '../../../public/images/bags.jpeg';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="homepage flex flex-col items-center justify-center px-6 py-10 text-center">
        <section className="hero-container flex flex-col md:flex-row items-center gap-10 max-w-6xl">
          <div className="w-full md:w-1/2">
            <Image
              src={HeroImage}
              alt="HostaBags. Your luggage space"
              className="rounded-lg shadow-lg"
              width={500}
              height={300}
              priority
            />
          </div>

          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-normal">Your luggage space.  <span className="text-indigo-600">HostaBags</span></h1>
            <p className="text-gray-600 text-lg mb-6">
              Store your luggage safely while you explore the city. Find trusted hosts near you and book in seconds—because your adventure should start weight-free.so.
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
