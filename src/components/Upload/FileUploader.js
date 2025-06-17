// src/components/Upload/FileUploader.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUploader() {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setSummary('');
    setError('');

    const reader = new FileReader();

    if (file.type === 'text/plain') {
      reader.onload = () => setFileContent(reader.result);
      reader.readAsText(file);
    } else if (file.type === 'application/pdf') {
      setError('PDF support will be added soon!');
    } else {
      setError('Unsupported file type. Upload a .txt file.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/plain': ['.txt'],
      // Add PDF later if backend supports
    },
  });

  const handleSummarize = async () => {
    if (!fileContent) return;

    setLoading(true);
    setSummary('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: fileContent }),
      });

      if (!response.ok) throw new Error('Failed to fetch summary');

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ padding: '40px' }}>
      <h2>Upload Notes (.txt)</h2>

      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #4b7bec',
          borderRadius: '12px',
          padding: '30px',
          textAlign: 'center',
          backgroundColor: isDragActive ? '#eef3ff' : '#fafafa',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop file here...</p> : <p>Drag & drop or click to select</p>}
      </div>

      {fileName && <div style={{ marginTop: '20px', fontWeight: 'bold' }}>📄 {fileName}</div>}

      {fileContent && (
        <textarea
          readOnly
          value={fileContent}
          style={{
            marginTop: '20px',
            width: '100%',
            height: '150px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            background: '#f3f3f3',
          }}
        />
      )}

      {fileContent && (
        <button onClick={handleSummarize} style={{ marginTop: '20px' }}>
          {loading ? '⏳ Summarizing...' : '🔍 Summarize Notes'}
        </button>
      )}

      {summary && (
        <div style={{ marginTop: '30px', backgroundColor: '#e0f0ff', padding: '20px', borderRadius: '10px' }}>
          <h3>🧠 Summary</h3>
          <p>{summary}</p>
        </div>
      )}

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}
