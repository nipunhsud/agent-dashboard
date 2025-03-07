import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import useCSRFToken from "../../hooks/useCSRFToken";
import useBackendUrl from '../../hooks/useBackendUrl';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const csrfToken = useCSRFToken();
  const backendUrl = useBackendUrl();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Please select a valid CSV file');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${backendUrl}/user/stock-analyses-csv/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-CSRFToken': csrfToken,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setSuccess(true);
      setFile(null);
      // Reset file input
      e.target.reset();
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-custom-purple mb-8">Upload Stock Analysis CSV</h1>
        
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-lg font-medium">Select CSV File</span>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-custom-purple border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label className="relative cursor-pointer rounded-md font-medium text-custom-purple hover:text-custom-purple focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept=".csv"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">CSV files only</p>
                </div>
              </div>
            </label>
            
            {file && (
              <div className="text-sm text-gray-400">
                Selected file: {file.name}
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm">
              File uploaded successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium 
              ${!file || loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-custom-purple hover:bg-opacity-80'} 
              transition-all duration-200`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Uploading...
              </div>
            ) : (
              'Upload CSV'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload; 