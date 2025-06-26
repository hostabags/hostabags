export default function QuantitySelector({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-4 my-3 bg-gray-50 p-3 rounded-lg">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer w-8 h-8"
      >
         <span className="text-gray-500 text-2xl" >-</span> 
      </button>
      <span className="text-lg font-semibold  w-8 text-center evid">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity(Math.min(10, quantity + 1))}
        className="flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer w-8 h-8"
      >
       <span className="text-gray-500 text-2xl"  >+</span> 
      </button>
    </div>
  );
}
