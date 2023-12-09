require('dotenv').config();
require('./database/connection');
const mongoose = require('mongoose');


require('./database/models/users');
require('./database/models/destinations');
require('./database/models/trips');

require('./database/models/accommodation/accommodationBases');
require('./database/models/accommodation/accommodationSlots');
require('./database/models/accommodation/accommodationExtras');

require('./database/models/activities/activityBases');
require('./database/models/activities/activitySlots');
require('./database/models/activities/activityExtras');

require('./database/models/transport/transportBases');
require('./database/models/transport/transportSlots');
require('./database/models/transport/transportExtras');


const findModelByCollectionName = (collectionName) => {
    const models = mongoose.connection.models;
    const model = models[collectionName];
    return model;
};

const generateRandomValueForField = (field) => {
    // This is a basic example; you might need to handle different field types accordingly
    if (field.type === String) {
      return getRandomString();
    } else if (field.type === Number) {
      return getRandomNumber();
    }
    // Handle other field types as needed
  
    return null; // Default to null if the field type is not handled
  };

// Helper functions for generating random values
const getRandomString = () => Math.random().toString(36).substring(7);
const getRandomNumber = () => Math.floor(Math.random() * 100);

const generateRandomDocument = (model) => {
    const schemaDefinition = model.schema.obj;
    const document = {};
  
    for (const fieldName in schemaDefinition) {
      if (schemaDefinition.hasOwnProperty(fieldName)) {
        const field = schemaDefinition[fieldName];
        document[fieldName] = generateRandomValueForField(field);
      }
    }
  
    return document;
};

const args = process.argv.slice(2);

const [collectionName, action, number] = args;

//console.log(collectionName, action, number);

const model = findModelByCollectionName(collectionName);

if (action === 'create'){
  console.log('creating...');
  const promises = [];
  for (let i = 0; i < number; i++) {
    const obj = generateRandomDocument(model);
    promises.push(model.create(obj));
  }
  Promise.all(promises).then(e => console.log(`created ${e.length} ${collectionName}`));
}
else if (action === 'clear'){
  console.log('deleting...');
  model.deleteMany().then(e => console.log(`deleted ${e.deletedCount} ${collectionName}`));
}

