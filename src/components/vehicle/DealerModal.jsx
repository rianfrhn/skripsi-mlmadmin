import React, { useState } from 'react';
import { createDealer } from '../../services/VehicleService';


export default function NewDealerModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const payload = {
          ...form,
          phone_number: parseInt(form.phone_number, 10),
        };
        const newDealer = await createDealer(payload);
        
        onCreated(newDealer);

    } catch(e){
        console.error(err);
        setError(err.message || 'Failed to create dealer');

    }finally{
        onClose();

    }
        
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Dealer</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="name"
            type="text"
            placeholder="Dealer Name"
            value={form.name}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <input
            name="phone_number"
            type="tel"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="textarea w-full"
            required
          />

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Dealer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}