import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Positions = new Mongo.Collection('Positions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const PositionSchema = new SimpleSchema({
  name: String,
  requirement: String,
  description: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Positions.attachSchema(PositionSchema);

/** Make the collection and schema available to other code. */
export { Positions, PositionSchema };
