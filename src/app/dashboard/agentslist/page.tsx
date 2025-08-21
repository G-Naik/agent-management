"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@/app/atoms"
import { getToken } from "@/app/Utils/auth";


interface Task {
  _id: string;
  firstname: string;
  mobile: string;
  note: string;
}

interface Agent {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  taskLists: Task[];
  createdAt: string;
}

export default function AgentListPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors , setErrors] = useState('')

  useEffect(() => {

    const token = getToken();

    const fetchAgents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API}/agentlist`,{
            method :"get",
            headers : {
                "content-type":"application/json",
                ...(token ? { authorization: `Bearer ${token}` } : {}),
            }

        });
        
        if(!res.ok) {
            setErrors("something Went wrong")
        }
        const response = await res.json();
        setAgents(response)

      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return <p className="text-center py-6">Loading agents...</p>;
  }

  return (
    <div className="max-w-[1260px] w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agent List</h1>

      {agents.length === 0 ? (
        <p className="text-gray-500">No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      )}
      <div>
        {
            errors && 
            <span className="text-red-500">{errors}</span>
        }
      </div>
    </div>
  );
}

/* ----------------- AGENT CARD ----------------- */
const AgentCard = ({ agent }: { agent: Agent }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-semibold text-lg">{agent.name}</h2>
        <Icon iconName="person" className="text-blue-600" />
      </div>

      {/* Info */}
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Email:</span> {agent.email}
        </p>
        <p>
          <span className="font-medium">Mobile:</span> {agent.mobile}
        </p>
        <p className="text-xs text-gray-500">
          Joined: {new Date(agent.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Task List */}
      <div>
        <h3 className="font-medium mb-2">Tasks</h3>
        {agent.taskLists.length > 0 ? (
          <ul className="space-y-1">
            {agent.taskLists.map((task) => (
              <li
                key={task._id}
                className="bg-gray-50 border rounded-md px-2 py-1 text-sm"
              >
                <span className="font-medium">{task.firstname}</span> -{" "}
                {task.mobile} <br />
                <span className="text-gray-600">{task.note}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};
