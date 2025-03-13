/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
    return {
        organization: data.organization,
        events: data.events,
        news: data.news
    };
}
