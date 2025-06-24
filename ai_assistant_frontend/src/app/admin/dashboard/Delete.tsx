import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Delete = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[420px] border-4 border-dotted flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-yellow-100 rounded-full p-3 mb-4">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">
            Асуултыг устгахад итгэлтэй байна уу?
          </h2>
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-center text-gray-500 text-sm border border-gray-200">
          Уг асуултыг устгавал дахин сэргээх боломжгүй болохыг анхаарна уу.
          </div>
        </div>
        <div className="flex w-full gap-4 mt-4">
          <button className="flex-1 border border-blue-400 text-blue-600 rounded-lg py-2 font-medium bg-white hover:bg-blue-50 transition">
            Болих
          </button>
          <button className="flex-1 bg-blue-500 text-white rounded-lg py-2 font-medium shadow hover:bg-blue-600 transition">
            Устгах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
