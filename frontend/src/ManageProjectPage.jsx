import React, { useState } from 'react';

const ManageProjectPage = () => {
  const [frontendFile, setFrontendFile] = useState(null);
  const [backendFile, setBackendFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('frontend', frontendFile);
    formData.append('backend', backendFile);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => alert(data))
      .catch((err) => console.error('Error uploading project:', err));
  };

  return (
    <div>
      <h1>Manage Projects</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Frontend (zip):</label>
          <input type="file" onChange={(e) => setFrontendFile(e.target.files[0])} />
        </div>
        <div>
          <label>Backend (zip):</label>
          <input type="file" onChange={(e) => setBackendFile(e.target.files[0])} />
        </div>
        <button type="submit">Upload Project</button>
      </form>
    </div>
  );
};

export default ManageProjectPage;
