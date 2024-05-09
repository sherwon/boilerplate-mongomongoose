require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
      console.error('Error connecting to MongoDB:', err);
  } else {
      console.log('Connected to MongoDB successfully!');
  }
});
const personSchema = new mongoose.Schema({
  name : {
      type: String,
      required: true
  },
  age : Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const sherwGwapo = new Person({name: "sher", age: 30, favoriteFoods: ["tambo", "boild egg"]});
  
  sherwGwapo.save((err, data) => {
    if(err) return console.log(err);
    done(null, data)
  });
};
const arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    done(null, data);
  })
 
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err); 
      done(null, updatedPerson);
    })

  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }) // Find people who like the specified food
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit the results to 2 documents
    .select('-age') // Exclude the 'age' field
    .exec(function(error, people) {
      if (error) {
        console.error(error);
        done(error);
      } else {
        done(null, people);
      }
    });
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
