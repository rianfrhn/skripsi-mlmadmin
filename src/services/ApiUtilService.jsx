import API from '../helpers/APIConnector';
export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    const resp = await API.post('/utils/upload-image', formData /*{headers: {'Content-Type': 'multipart/form-data'}}*/);
    return resp.url; 
  }