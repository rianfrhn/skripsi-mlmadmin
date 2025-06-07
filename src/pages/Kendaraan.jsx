
import React, { useEffect, useState } from 'react';
import { deleteVehicle, fetchVehiclesPaged } from '../services/VehicleService';
import VehiclesTable from '../components/VehiclesTable';
import Pagination from '../components/Pagination';
import AddVehicleModal from '../components/vehicle/VehicleModal';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [page, setPage]         = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 5;

  const load = async (p = page) => {
    setPage(p);
    const response =await fetchVehiclesPaged(p, PAGE_SIZE);
    const items = response.page_content
    const vehicleTotal = response.total
    setVehicles(items);
    setTotal(vehicleTotal);
    console.log("LOADDD")
  };

  useEffect(() => { load(1) }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    await deleteVehicle(id);
    load(page);
  };

  const handleEdit = (vehicle) => {
    console.log('edit', vehicle);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Kendaraan</h1>
      <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
        Tambah Kendaraan
      </button>
      <VehiclesTable
        vehicles={vehicles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="mt-4 flex justify-end">
        <Pagination
          page={page}
          total={total}
          pageSize={PAGE_SIZE}
          onPageChange={load}
        />
      </div>
      <AddVehicleModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={() => load(page)}
      />
    </div>
  );
}