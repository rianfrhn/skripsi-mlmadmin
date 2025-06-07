class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL.replace(/\/+$/, '');
  }

  async request(path, { method = 'GET', body = null, headers = {} } = {}) {
    const url = `${this.baseURL}/${path.replace(/^\/+/, '')}`;
    const opts = { method, headers: { ...headers } };

    if (body != null) {
      if (body instanceof FormData) {
        opts.body = body;
      }
      else if (body instanceof URLSearchParams) {
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        opts.body = body.toString(); // URLSearchParams => "username=foo&password=bar"
      }
      else {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(body);
      }
    }

    const res = await fetch(url, opts);
    if (!res.ok) {
      const text = await res.text();
      let err;
      try { err = JSON.parse(text); }
      catch { err = text; }
      const e = new Error(`API error ${res.status}: ${res.statusText}`);
      e.details = err;
      throw e;
    }
    if (res.status === 204) return null;
    return res.json();
  }

  get(path, opts)    { return this.request(path, { ...opts, method: 'GET'  }); }
  post(path, body, opts)  { return this.request(path, { ...opts, method: 'POST', body }); }
  patch(path, body, opts) { return this.request(path, { ...opts, method: 'PATCH', body }); }
  put(path, body, opts)   { return this.request(path, { ...opts, method: 'PUT', body }); }
  delete(path, opts)      { return this.request(path, { ...opts, method: 'DELETE' }); }
}

const API = new ApiClient('http://localhost:8000');
export default API;