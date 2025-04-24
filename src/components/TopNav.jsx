import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-none">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <span class="material-icons">menu</span>
        </label>
      </div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">MLM Admin</Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost">Profil</button>
        <button className="btn btn-ghost">Logout</button>
      </div>
    </div>
  );
};

export default TopNav;