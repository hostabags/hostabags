interface UsersStatusProps {
  loading: boolean;
  error: string | null;
}

const UsersStatus = ({ loading, error }: UsersStatusProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 text-lg text-gray-600">
        Cargando usuarios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-lg text-red-600 bg-red-100 border border-red-300 rounded my-4">
        {error}
      </div>
    );
  }

  return null;
};

export default UsersStatus; 