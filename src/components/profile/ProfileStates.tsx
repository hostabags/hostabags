export const ProfileLoading = () => (
  <main className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Cargando perfil...</p>
    </div>
  </main>
);

export const ProfileError = ({ message }: { message: string }) => (
  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
    {message}
  </div>
);

export const ProfileSuccess = ({ message }: { message: string }) => (
  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
    {message}
  </div>
);

export const ProfileNoData = () => (
  <main className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <p className="text-gray-600">No se encontraron datos del usuario</p>
    </div>
  </main>
); 