require('./database/connection');
const TransportSlot = require('./database/models/transport/transportSlots');

TransportSlot.aggregate([{ $sample: { size: 1 } }])
  .then((err, randomDocuments) => {
    if (err) {
      console.error(err);
      return;
    }

    const randomDocument = randomDocuments[0];
    console.log(randomDocument);
});