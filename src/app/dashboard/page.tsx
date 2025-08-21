"use client";
import React from "react";
import { Icon } from "../atoms";
import Link from "next/link";

export default function DashboardLanding() {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Welcome back, Admin 👋</h1>
        <p className="text-sm mt-2">
          Manage your agents and keep track of all assigned tasks in one place.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon="person" label="Total Agents" value="5" />
        <StatCard icon="list" label="Total Tasks" value="12" />
        <StatCard icon="clock" label="Pending Follow-ups" value="3" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-xl shadow-md flex gap-4">
        <Link href="/dashboard/agent" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Icon iconName="add" /> Add Agent
        </Link>
        <Link href="/dashboard/uploads" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          <Icon iconName="upload" /> Upload List
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="border-b pb-2">✅ Priya added to task list</li>
          <li className="border-b pb-2">📞 Follow-up scheduled with Sneha</li>
          <li>➕ New agent Gabriel registered</li>
        </ul>
      </div>
    </div>
  );
}

/* ----------------- STAT CARD ----------------- */
const StatCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-3">
    <Icon iconName={icon} className="text-blue-600 text-xl" />
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-lg font-bold">{value}</h3>
    </div>
  </div>
);
