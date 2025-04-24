import React from 'react';

const Kendaraan = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manajemen Inventori</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Beat", "Vario 125", "Genio"].map((vehicle, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{vehicle}</h2>
              <p>Model Tahun: {2020 + index}</p>
              <p>Harga: Rp{(index + 4) * 10000000}</p>
              <div className="mt-4">
                <button className="btn btn-sm btn-outline">Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-base-200 p-6 rounded-md shadow-xl">
        <p className="text-gray-600">[Placeholder]</p>
      </div>
    </div>
  );
};

export default Kendaraan;