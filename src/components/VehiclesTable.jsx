// components/VehiclesTable.jsx
import React from 'react';

export default function VehiclesTable({ vehicles, onEdit, onDelete }) {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Gambar</th>
          <th>Nama</th>
          <th>Price (Rp)</th>
          <th>Description</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        { vehicles?
        vehicles.map(v => (
          <tr key={v.id}>
            <td>
              {v.display_image
                ? <img src={v.display_image} alt={v.name} className="w-16 h-10 object-cover rounded" />
                : <span className="text-sm text-gray-400">No image</span>
              }
            </td>
            <td>{v.name}</td>
            <td>{v.price.toLocaleString()}</td>
            <td>{v.description || '-'}</td>
            <td className="text-center space-x-2">
              <button
                className="btn btn-xs btn-outline btn-info"
                onClick={() => onEdit(v)}
              >
                Edit
              </button>
              <button
                className="btn btn-xs btn-outline btn-error"
                onClick={() => onDelete(v.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        )) : <p>Tidak ada data</p>
    }
      </tbody>
    </table>
  );
}