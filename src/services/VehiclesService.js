export const GetVehicleInformationRequest = async (datasetId, vehicleId) =>{
    return fetch(`https://api.coxauto-interview.com/api/${datasetId}/vehicles/${vehicleId}`)
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
            else{
                throw new Error("Invalid API Call to fetch datasetId");
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
            return null;
        })
};

export const GeVehiclesIdsRequest = async (datasetId) =>{
    return fetch(`https://api.coxauto-interview.com/api/${datasetId}/vehicles`)
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
            else{
                throw new Error("Invalid API Call to fetch datasetId");
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
            return null;
        })
};
