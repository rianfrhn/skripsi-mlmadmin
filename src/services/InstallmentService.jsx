import API from "../helpers/APIConnector";

export async function getAllInstallments() {
  const response = await API.get("/installments/");
  return response;
}

export async function payInstallment(installmentId, paid = 0) {
  const response = await API.patch(
    `/installments/${installmentId}/pay`,
    { paid }
  );
  return response;
}
export async function fetchPendingInstallments() {
  return await API.get("/installments/pending");
}
export async function fetchOverduePayments() {
  return await API.get("/installments/overdue-today");
}
export async function fetchRevenueToday() {
  // expects { total: number }
  return await API.get("/installments/revenue-today");
}
export async function fetchRecentPayments(limit = 5) {
  return await API.get(`/payments/recent?limit=${limit}`);
}
export async function fetchPaymentTrend(days = 7) {
  // e.g. GET /payments/trend?days=7
  return await API.get(`/installments/payments/trend?days=${days}`);
}