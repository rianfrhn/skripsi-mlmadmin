

import API from '../helpers/APIConnector';

export async function fetchVehicles() {
    //console.log("fetching vehicles")
    
    const resp = await API.get(`/vehicles/`);
    //console.log("a")
    return resp; // { items: VehicleRead[], total: number }
}
export async function fetchVehiclesPaged(page = 1, pageSize = 10){
    
    const resp = await API.get(`/vehicles/paged?page=${page}&page_size=${pageSize}`);
    //console.log("a")
    return resp; // { items: VehicleRead[], total: number }

}
  
  export async function deleteVehicle(id) {
    await API.delete(`/vehicles/${id}`, { method: 'DELETE' });
  }
  
  export async function updateVehicle(id, data) {
    await API.patch(`/vehicles/${id}`, data)
  }
  
export async function createVehicle(data) {
    const resp = await API.post('/vehicles/', data);
    return resp;
  }
  
  export async function fetchDealers() {
    const resp = API.get(`/dealers/`);
    return resp;
  }
  export async function createDealer(data) {
    const resp = API.post(`/dealers`, data)
    return resp;
}