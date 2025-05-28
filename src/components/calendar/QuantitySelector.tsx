import { ChevronLeft, ChevronRight } from "lucide-react";

export default function QuantitySelector({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-4 my-4">
      <button
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <span className="text-lg font-semibold text-gray-800 w-8 text-center">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
