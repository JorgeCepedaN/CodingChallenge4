import React, { useEffect, useState } from 'react';
import { GetDatasetIdRequest } from './services/datasetService';
import Vehicles from './components/vehicles';
import './App.css';

function App() {
  const [dataset, setDataset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetDatasetIdRequest()
      .then((result) => {
        setDataset(result.datasetId);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dataset ID:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {dataset && <Vehicles datasetId={dataset} />}
        </>
      )}
    </div>
  );
}

export default App;
