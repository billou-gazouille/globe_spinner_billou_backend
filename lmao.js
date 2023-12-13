    require('./database/connection');
    const TransportSlot = require('./database/models/transport/transportSlots');

    TransportSlot.updateMany(
        {},
        { $set: { 'firstClass.price': { $multiply: ['$firstClass.price', 0.5] }, 
                    'secondClass.price': { $multiply: ['$secondClass.price', 0.5] } 
                } 
        },
        { new: true }
    ).then(() => console.log('Done'));