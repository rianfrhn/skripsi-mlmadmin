import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Login Admin</h1>
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Kata Sandi</span>
              </label>
              <input type="password" placeholder="Kata Sandi" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Masuk</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}