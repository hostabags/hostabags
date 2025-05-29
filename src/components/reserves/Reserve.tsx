export default function Reserve() {
  return (
    <div className="m-8">
      <h2 className="text-2xl text-bold">Direccion de la reserva</h2>
      <div className="flex justify-between">
        <div className="flex">
          <p>Fechas de la reserva: del 1-6-25 al 2-6-25</p>
          <p>Cantidad de maletas contratadas: 2</p>
          <p>Precio total: 18€</p>
        </div>

        <button className="bg-blue-500 bg- hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5">
          Confirmar reserva
        </button>
      </div>
    </div>
  );
}
