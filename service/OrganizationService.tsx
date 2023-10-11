import { Organization } from '../app/types/organization';

export const OrganizationService = {
    getAll() {
        return fetch('/mock/organization.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Organization[]);
    }
};
