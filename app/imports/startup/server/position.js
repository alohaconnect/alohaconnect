import { Meteor } from 'meteor/meteor';
import { Positions } from '../../api/position/position.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Positions.insert(data);
}

/** Initialize the collection if empty. */
if (Positions.find().count() === 0) {
  if (Meteor.settings.defaultPosition) {
    console.log('Creating default position.');
    Meteor.settings.defaultPosition.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Position', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Positions.find({ owner: username });
  }
  return this.ready();
});

// need to add admin position
