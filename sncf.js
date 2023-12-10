const moment = require('moment');

const api_key = 'd5991af1-ca2e-43e3-8045-5788c9066f6e'

const baseURL = 'https://api.navitia.io/v1/coverage/sncf/';

// const from = "gare de l'est";
// const to = "metz ville";
const from = "orleans";
const to = "dijon";

const fetchPlaces = (name) => {
    return fetch(`${baseURL}places/?q=${name}`, {
        headers: { 'Authorization': api_key }
    })
    .then(resp => resp.json());
};

Promise.all([fetchPlaces(from), fetchPlaces(to)])
    .then(data => {
        const [dataFrom, dataTo] = data;

        console.log('from: ', dataFrom.places[0].name);
        console.log('to: ', dataTo.places[0].name);

        fromId = dataFrom.places[0].id;
        toId = dataTo.places[0].id;
        const fullURL = `${baseURL}journeys/?from=${fromId}&to=${toId}`;
        //console.log(fullURL);
        fetch(fullURL, {
            headers: { 'Authorization': api_key }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log('journeys: ', data.journeys.map(j => ({
                departure: moment(j.departure_date_time, 'YYYYMMDDTHHmm').format('MMMM D, YYYY, HH:mm'),
                arrival: moment(j.arrival_date_time, 'YYYYMMDDTHHmm').format('MMMM D, YYYY, HH:mm'),
            })));
        });
    })


