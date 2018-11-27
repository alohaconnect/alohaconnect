import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Students = new Mongo.Collection('Students');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StudentSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Students.attachSchema(StudentSchema);

/** Make the collection and schema available to other code. */
export { Students, StudentSchema };
