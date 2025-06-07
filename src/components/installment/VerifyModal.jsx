import React, { useEffect, useState } from "react";
import API from "../../helpers/APIConnector";

export default function VerifyModal({ instId, agentId, open, onClose, onVerified }) {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);
  useEffect(() => {
    if (open && agentId) {
      fetchDocs();
    }
  }, [open, agentId]);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const resp = await API.get(`/documents/${agentId}`);
      setDocs(resp);
      setError(null);
    } catch (e) {
      console.error("Failed to fetch documents:", e);
      setError("Gagal memuat dokumen.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await API.patch(`/installments/${instId}/status`, { 'status':'Accepted' });
      onVerified();
      onClose();
    } catch (e) {
      console.error("Failed to verify installment:", e);
      alert("Gagal memverifikasi cicilan.");
    } finally {
      setVerifying(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-11/12 max-w-lg">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-semibold">Verifikasi Cicilan #{instId}</h3>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500">Memuat dokumen…</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : docs ? (
            <div className="space-y-4">
              {/* For each document, if URL exists, render a download link */}
              {docs.national_id_url && (
                <div>
                  <span className="font-medium">KTP (National ID):</span>{" "}
                  <a
                    href={API.baseURL+docs.national_id_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Unduh
                  </a>
                </div>
              )}
              {docs.self_portrait_url && (
                <div>
                  <span className="font-medium">Foto Diri:</span>{" "}
                  <a
                    href={API.baseURL+docs.self_portrait_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Unduh
                  </a>
                </div>
              )}
              {docs.partner_portrait_url && (
                <div>
                  <span className="font-medium">Foto Pasangan:</span>{" "}
                  <a
                    href={API.baseURL+docs.partner_portrait_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Unduh
                  </a>
                </div>
              )}
              {docs.family_card_url && (
                <div>
                  <span className="font-medium">Kartu Keluarga:</span>{" "}
                  <a
                    href={API.baseURL+docs.family_card_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Unduh
                  </a>
                </div>
              )}
              {!docs.national_id_url &&
                !docs.self_portrait_url &&
                !docs.partner_portrait_url &&
                !docs.family_card_url && (
                  <p className="text-gray-500 italic">
                    Tidak ada dokumen tersedia.
                  </p>
                )}
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada data.</p>
          )}
        </div>

        <div className="flex justify-end px-6 py-4 border-t">
          <button
            className="btn btn-outline mr-2"
            onClick={onClose}
            disabled={verifying}
          >
            Batal
          </button>
          <button
            className="btn btn-primary"
            onClick={handleVerify}
            disabled={verifying}
          >
            {verifying ? "Memverifikasi…" : "Verifikasi"}
          </button>
        </div>
      </div>
    </div>
  );
}