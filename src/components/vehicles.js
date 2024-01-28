import React, { useEffect, useState } from "react";
import { GeVehiclesIdsRequest, GetVehicleInformationRequest } from "../services/vehiclesService";
import VehicleInfo from "./vehicleInfo";

export default function Vehicles({ datasetId }) {
    const [vehicles, setVehicles] = useState(null);
    const [vehiclesDetails, setVehiclesDetails] = useState([]);
    const [vehiclesDetailsCopy, setVehiclesDetailsCopy] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const getVehiclesInfo = (vehiclesIds) => {
            setIsLoading(true);
            if(vehiclesIds !== null){
                const promises = vehiclesIds.map((id) => (
                    GetVehicleInformationRequest(datasetId, id)
                        .catch((error) => {
                            console.log(`Error while obtaining the information of the Vehicle ${id}: `, error);
                            return null; // Return null for failed promises
                        })
                ));
            
                Promise.all(promises)
                    .then((vehicleDetails) => {
                        // Filter out null values
                        const validVehicleDetails = vehicleDetails.filter(Boolean);
                        
                        // Sort vehicles by year in descending order
                        const sortedVehicles = validVehicleDetails.sort((a, b) => b.year - a.year);
            
                        setVehiclesDetails(sortedVehicles);
                        setVehiclesDetailsCopy(sortedVehicles);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error while obtaining vehicle details: ", error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
            else{
                console.error("Error while fetching vehicles Ids");
            }

        };
        setIsLoading(true);
        GeVehiclesIdsRequest(datasetId)
            .then((result) => {
                setVehicles(result.vehicleIds);
                getVehiclesInfo(result.vehicleIds);
            })
            .catch((error) => {
                console.error("Error while fetching vehicles Ids: ", error);
            })
            .finally(() => {
            });
    }, [datasetId]);


    const handleSearch = () => {
        const filteredVehicles = vehiclesDetails.filter((vehicle) => (
            vehicle.model.toLowerCase() === searchQuery.toLowerCase() ||
            vehicle.make.toLowerCase() === searchQuery.toLowerCase() ||
            vehicle.year.toString() === searchQuery.toLowerCase()
        ));

        setVehiclesDetails(filteredVehicles);
    };

    const handleClear = () => {
        setSearchQuery(""); // Clear the filtered results
        setVehiclesDetails(vehiclesDetailsCopy); // Set up the copy of the data
    };

    const handleSort = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        if(sortOrder === 'asc'){
            const sortedVehicles = vehiclesDetails.sort((a, b) => b.year - a.year);
            setVehiclesDetails(sortedVehicles);
        }
        else{
            const sortedVehicles = vehiclesDetails.sort((a, b) => a.year - b.year);
            setVehiclesDetails(sortedVehicles)
        }
    };

    return (
        <div className="vehicles-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by make, model or year"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <span role="img" aria-label="Clear" onClick={handleClear}>
                        ❌
                    </span>
                )}
                <span role="img" aria-label="Search" onClick={handleSearch}>
                    🔍
                </span>
            </div>
            {isLoading ? (
                <p>Loading info...</p>
            ) : (
                <table className="vehicle-table">
                    <thead>
                        <tr>
                            <th onClick={handleSort} className="sortable-header">
                                Year
                                <svg
                                    className={`sort-icon ${sortOrder === "asc" ? "asc" : "desc"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                >
                                    <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                                </svg>
                            </th>
                            <th>Make</th>
                            <th>Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiclesDetails && <VehicleInfo vehicles={vehiclesDetails} />}
                    </tbody>
                </table>
            )}
        </div>
    );

}
