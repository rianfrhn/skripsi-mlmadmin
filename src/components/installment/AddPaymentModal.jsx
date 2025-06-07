import React, { useState } from "react";
import API from "../../helpers/APIConnector";

/**
 * Props:
 *  - installmentId: number
 *  - open: boolean
 *  - onClose: () => void
 *  - onPaid: () => void    // called after successful payment
 */
export default function PaymentModal({
  installmentId,
  open,
  onClose,
  onPaid,
}) {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Silakan masukkan jumlah pembayaran yang valid.");
      return;
    }

    setSubmitting(true);
    try {
      // Assuming your API endpoint is PATCH /installments/{id}/pay-amount
      // with a JSON body { "amount": 500000 }
      await API.patch(`/installments/${installmentId}/pay`, {
        amount: amt,
      });
      onPaid();
      onClose();
    } catch (e) {
      console.error("Gagal melakukan pembayaran:", e);
      alert("Gagal melakukan pembayaran.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-11/12 max-w-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-semibold">
            Bayar Cicilan #{installmentId}
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <label className="block">
            <span className="font-medium">
              Jumlah Pembayaran (Rp)
            </span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full mt-2"
              placeholder="Masukkan nominal"
            />
          </label>
        </div>

        <div className="flex justify-end px-6 py-4 border-t">
          <button
            className="btn btn-outline mr-2"
            onClick={onClose}
            disabled={submitting}
          >
            Batal
          </button>
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Memproses…" : "Bayar"}
          </button>
        </div>
      </div>
    </div>
  );
}