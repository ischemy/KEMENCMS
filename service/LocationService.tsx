import { Location } from '../app/types/location';

export const LocationService = {
    getAll() {
        return fetch('/mock/location.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Location[]);
    }
};
