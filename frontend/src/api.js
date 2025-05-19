import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Ajusta si tu backend usa otro puerto

export const fetchJugadores = async () => {
    try {
        const response = await axios.get(`${API_URL}/jugadores`);
        return response.data;
    } catch (error) {
        console.error("Error fetching jugadores:", error);
        return [];
    }
};
