import React, { useEffect, useState } from 'react';
import { getAllInstallments, payInstallment } from '../services/InstallmentService';
import InstallmentGrid from '../components/InstallmentsGrid';
import VerifyModal from '../components/installment/VerifyModal';
import PaymentModal from '../components/installment/AddPaymentModal';

const Cicilan = () => {
  const [allInst, setAllInst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Ongoing"); // or "Ongoing"

  const [pendingList, setPendingList] = useState([])
  const [ongoingList, setOngoingList] = useState([])
  const [toShow, setToShow] = useState([])
  
  // For VerifyModal
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedAgentForVerify, setSelectedAgentForVerify] = useState(null);

  // For PaymentModal
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedInstallmentForPay, setSelectedInstallmentForPay] = useState(null);
  
  
  useEffect(() => {
    fetchInstallments().then(()=>{

    });


  }, []);

  
  // When “Verify” is clicked on a Pending card
  const openVerifyModal = (instId, agentId) => {
    setSelectedAgentForVerify(agentId);
    setSelectedInstallmentForPay(instId);
    setVerifyModalOpen(true);
  };
  const closeVerifyModal = () => {
    setVerifyModalOpen(false);
    setSelectedAgentForVerify(null);
  };
  const handleVerified = () => {
    // After successful verification, refresh list
    fetchInstallments();
  };

  // When “Bayar” is clicked on an Ongoing card
  const openPaymentModal = (installmentId) => {
    setSelectedInstallmentForPay(installmentId);
    setPaymentModalOpen(true);
  };
  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedInstallmentForPay(null);
  };
  const handlePaid = () => {
    // After successful payment, refresh list
    fetchInstallments();
  };
  const updateContent = (filterStatus)=>{
      setFilter(filterStatus);
      if (filterStatus === "Pending") setToShow(pendingList);
      else setToShow(ongoingList)

  }

  const fetchInstallments = async () => {
    try {
      setLoading(true);
      const data = await getAllInstallments();
      console.log(data)
      setAllInst(data);
      const pendingList = data.filter((inst) => inst.status == "Pending");
      const ongoingList = data.filter(
        (inst) => inst.status == "Accepted" && inst.remaining_duration > 0
      );
      setPendingList(pendingList)
      setOngoingList(ongoingList)
      setToShow(ongoingList)
    } catch (e) {
      console.error("Failed fetching installments:", e);
      setError("Gagal memuat data cicilan.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-4">Loading …</p>;
  if (error)
    return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pembayaran Cicilan</h1>
      <div className="mb-6 flex space-x-2">

        <button
          className={`btn btn-sm ${
            filter === "Ongoing"
              ? "btn-success"
              : "btn-outline btn-success"
          }`}
          onClick={() => updateContent("Ongoing")}
        >
          Ongoing ({ongoingList.length})
        </button>
        <button
          className={`btn btn-sm ${
            filter === "Pending"
              ? "btn-primary"
              : "btn-outline btn-primary"
          }`}
          onClick={() => updateContent("Pending")}
        >
          Pending ({pendingList.length})
        </button>
      </div>

      <InstallmentGrid
        installments={toShow}
        onPay={openPaymentModal}
        onVerify={openVerifyModal}
      />
      

      <VerifyModal
        agentId={selectedAgentForVerify}
        instId={selectedInstallmentForPay}
        open={verifyModalOpen}
        onClose={closeVerifyModal}
        onVerified={handleVerified}
      />

      <PaymentModal
        installmentId={selectedInstallmentForPay}
        open={paymentModalOpen}
        onClose={closePaymentModal}
        onPaid={handlePaid}
      />
      
    </div>
  );
};

export default Cicilan;