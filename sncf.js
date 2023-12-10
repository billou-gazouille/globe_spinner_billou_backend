const moment = require('moment');

const api_key = 'd5991af1-ca2e-43e3-8045-5788c9066f6e'

const baseURL = 'https://api.navitia.io/v1/coverage/sncf/';

// const from = "gare de l'est";
// const to = "metz ville";
const from = "part dieu";
const to = "bruxelles";
const date = '28/12/2023-11:30';


function convertDateFormat(inputDate) {
    const dateObject = moment(inputDate, 'DD/MM/YYYY-HH:mm');
    const formattedDate = dateObject.format('YYYYMMDDTHHmmss');
    return formattedDate;
}


const fetchPlaces = (name) => {
    const url = `${baseURL}places/?q=${name}`;
    //console.log(url);
    return fetch(url, {
        headers: { 'Authorization': api_key }
    })
    .then(resp => resp.json());
};

Promise.all([fetchPlaces(from), fetchPlaces(to)])
    .then(data => {
        const [dataFrom, dataTo] = data; 
        const fromStopAreas = dataFrom.places.filter(p => p.embedded_type === "stop_area");
        const toStopAreas = dataTo.places.filter(p => p.embedded_type === "stop_area");

        if (fromStopAreas.length === 0 || toStopAreas.length === 0){
            console.log('no journey found');
            return;
        }

        console.log('from: ', fromStopAreas[0].name);
        console.log('to: ', toStopAreas[0].name);
        fromId = fromStopAreas[0].id;
        //console.log('fromId: ', fromId);
        toId = toStopAreas[0].id;
        //console.log('toId: ', toId);
        const dateTime = convertDateFormat(date);
        const url = `${baseURL}journeys/?from=${fromId}&to=${toId}&datetime=${dateTime}`;
        //console.log(url);
        fetch(url, {
            headers: { 'Authorization': api_key }
        })
        .then(resp => resp.json())
        .then(data => {
            if (Object.keys(data).includes('error')){
                console.log('ERROR (probably due to unavalable date)');
                return;
                // On dirait qu'on a seulement acces au horaires 
                // quelques jours autours de la date actuelle :(
            }
            console.log('journeys: ', data.journeys.map(j => ({
                departure: moment(j.departure_date_time, 'YYYYMMDDTHHmm').format('MMMM D, YYYY, HH:mm'),
                arrival: moment(j.arrival_date_time, 'YYYYMMDDTHHmm').format('MMMM D, YYYY, HH:mm'),
            })));
        });
    })


