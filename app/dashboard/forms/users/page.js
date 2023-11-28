"use client"
import React, { useState } from 'react';

function UserList({ users }) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Name/Email
            </th>
            <th scope="col" className="py-3 px-6">
              Role
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="py-4 px-6">{user.name}</td>
              <td className="py-4 px-6">{user.role}</td>
              <td className="py-4 px-6 text-right">
                <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState([
    { name: 'Jane Doe', role: 'Admin' },
    { name: 'John Smith', role: 'Employee' },
    // Add more dummy data as needed
  ]);

  const addUser = () => {
    const newUser = { name: `New User ${users.length + 1}`, role: 'Employee' };
    setUsers([...users, newUser]);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Users</h1>
        <button
          onClick={addUser}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add User
        </button>
      </div>
      <UserList users={users} />
    </div>
  );
}
