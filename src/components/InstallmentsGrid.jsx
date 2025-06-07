import React from "react";

export default function InstallmentGrid({ installments, onPay, onVerify }) {
  if (!installments || installments.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        Tidak ada cicilan untuk ditampilkan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {installments.map((inst) => {
        const isPending = inst.status === "Pending";
        const isOngoing =
          inst.status === "Accepted" && inst.remaining_duration > 0;
        const isCompleted = inst.remaining_duration === 0;

        let borderColor = "border-gray-300";
        if (isPending) borderColor = "border-yellow-400";
        if (isOngoing) borderColor = "border-green-500";
        if (isCompleted) borderColor = "border-gray-500";

        return (
          <div
            key={inst.id}
            className={`card bg-base-100 shadow-md border-l-4 ${borderColor}`}
          >
            <div className="card-body">
              <h2 className="card-title text-lg">
                Cicilan #{inst.id}
              </h2>

              <p>
                <span className="font-semibold">Agen:</span>{" "}
                {inst.agent.name}
              </p>
              <p>
                <span className="font-semibold">Kendaraan:</span>{" "}
                {inst.vehicle.name}
              </p>
              <p>
                <span className="font-semibold">
                  Harga:
                </span>{" "}
                {inst.vehicle.price}
              </p>
              <p>
                <span className="font-semibold">
                  Terbayar:
                </span>{" "}
                {inst.total_paid}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`badge ${
                    isPending
                      ? "badge-warning"
                      : isOngoing
                      ? "badge-success"
                      : "badge-secondary"
                  }`}
                >
                  {inst.status}
                </span>
              </p>

              {(isPending || isOngoing) && (
                <div className="card-actions justify-end mt-4">
                  {isPending && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => onVerify(inst.id, inst.agent_id)}
                    >
                      Verifikasi
                    </button>
                  )}
                  {isOngoing && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => onPay(inst.id)}
                    >
                      Konfirmasi Bayar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}