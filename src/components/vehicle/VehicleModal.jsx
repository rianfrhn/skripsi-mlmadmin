import React, { useEffect, useMemo, useState } from 'react';
import { createVehicle, fetchDealers } from '../../services/VehicleService';
import NewDealerModal from './DealerModal';
import { uploadImage } from '../../services/ApiUtilService';

export default function AddVehicleModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    display_image: '',
    dealer_id: '',
    quantity:1
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dealers, setDealers] = useState([]);
  const [showDealerModal, setShowDealerModal] = useState(false);

  useEffect(() => {
    fetchDealers().then(setDealers); // expects [{id,name}]
  }, [showDealerModal]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      //const url = await uploadImage(file);
      //setForm(f => ({ ...f, display_image: url }));
      setUploadedFile(file)
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if(uploadedFile){
      const url = await uploadImage(uploadedFile);
      console.log(url)
        setForm(f => ({ ...f, display_image: url }));

    }

    await createVehicle(form);
    onCreated();
    onClose();
  };
  const handleNewDealer = dealer => {
    setForm(f => ({ ...f, dealer_id: dealer.id }));
  };

  return isOpen ? (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Vehicle</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input w-full"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="input w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="textarea w-full"
          />
          
          <label className="block">
            <span className="label">Vehicle Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </label>
          {uploading ? (
            <p className="text-sm text-gray-500">Uploading…</p>
          ) : form.display_image ? (
            <img
              src={form.display_image}
              alt="Preview"
              className="w-32 h-20 object-cover rounded"
            />
          ) : null}

          <div className="flex items-center space-x-2">
            <select
              name="dealer_id"
              value={form.dealer_id}
              onChange={handleChange}
              className="select flex-1"
              required
            >
              <option value="">-- select dealer --</option>
              {dealers.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => setShowDealerModal(true)}
            >
              New Dealer
            </button>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>

        <NewDealerModal
          isOpen={showDealerModal}
          onClose={() => {setShowDealerModal(false); }}
          onCreated={handleNewDealer}
        />
      </div>
    </div>
  ) : null;
}