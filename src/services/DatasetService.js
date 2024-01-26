export const GetDatasetIdRequest = async () => {
    return fetch(`https://api.coxauto-interview.com/api/datasetId`)
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
}