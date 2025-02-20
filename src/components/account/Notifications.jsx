import React from "react";

const Notifications = () => {
  return (
    <div className="w-full bg-white shadow-md p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <ul>
        <li className="p-2 border-b flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://picsum.photos/50"
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-600">New listing added</p>
            </div>
          </div>
          <button
            className="w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center"
            onClick={() => alert("Show actions for Notification 1")}
          >
            <span className="text-xl">•••</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Notifications;
