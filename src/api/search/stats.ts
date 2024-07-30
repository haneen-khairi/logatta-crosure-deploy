import api from "..";

const crimes = (data: object) => api.post(`police/crimes/statistics/`, data);

const fires = (data: object) => api.post(`fire/incidents/statistics/`, data);

const fireIncidents = (data: object) => api.post(`/core/places/download/`, data);


export { crimes, fires, fireIncidents };
