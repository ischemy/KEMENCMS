import { Practitioner } from '../app/types/practitioner';

export const PractitionerService = {
    getAll() {
        return fetch('/mock/practitioner.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Practitioner[]);
    }
};
