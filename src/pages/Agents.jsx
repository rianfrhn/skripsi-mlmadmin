import React from 'react';

const Agents = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agent Management</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Tanggal Masuk</th>
              <th>Referensi</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {['testuser1', 'testuser2', 'testuser3'].map((user, index) => (
              <tr key={index}>
                <td>{user}</td>
                <td>{user.replace(' ', '.').toLowerCase()}@example.com</td>
                <td>2025-01-{10 + index}</td>
                <td>testuser1</td>
                <td><span className="badge badge-success">Active</span></td>
                <td><button className="btn btn-sm btn-outline">Detail</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agents;