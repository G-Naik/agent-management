"use client";

import { Button } from "@/app/atoms";
import InputWithIcon from "@/app/molecules/InputWithIcon";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only CSV, XLS, and XLSX files are allowed");
        setFile(null);
        return;
      }

      setError(null);
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API}/uploads`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      setSuccess("✅ File uploaded successfully!");
      console.log("Upload response:", data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Upload Task List</h1>
      <p className="text-gray-600 mb-4">
        Upload a CSV or Excel file. This will replace the existing task list and redistribute tasks among agents.
      </p>

      <InputWithIcon
        type="file"
        onChange={handleFileChange}
        className="mb-4 w-full border rounded p-2 flex items-center justify-center"
        accept=".csv,.xlsx,.xls"
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <Button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
