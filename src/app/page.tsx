import Header from "@/components/layout/header/Header";
import Search from "@/components/Search";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {/* Main content area */}
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left column - Image Placeholder */}
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <div className="bg-gray-400 w-full h-64 flex items-center justify-center text-gray-800 text-center">
                IMAGEN DE MALETAS O ALGO QUE REPRESENTE ESTA APLICACION
              </div>
            </div>

            {/* Right column - Text and Search */}
            <div className="lg:w-1/2 w-full lg:pl-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">HostaBags</h1>
              <p className="mb-6 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, beatae non! Quae dolorum fuga ex excepturi sequi
                facere ratione! Veniam doloremque voluptates ipsum rem, quae cum
                commodi repudiandae debitis, sit tempore deserunt iure? Iure,
                animi corrupti? Magni recusandae ipsum nostrum, atque voluptate
                aut consectetur, ex eaque fugiat voluptatum ipsa placeat!
              </p>
              <div className="w-full max-w-sm">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
