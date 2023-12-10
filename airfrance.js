// fetch('https://api.airfranceklm.com/opendata/flightstatus', {
//     headers: {
//         'API-Key': 'xjmn7z4upjx8vzw6g48d4ckv',
//     },
// })
//     .then(resp => resp.json())
//     .then(data => {
//         console.log(data);
//     });

fetch('https://api.airfranceklm.com/opendata/flightoffer', {
    headers: {
        'API-Key': 'xjmn7z4upjx8vzw6g48d4ckv',
    },
})
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    });