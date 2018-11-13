import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Companies = new Mongo.Collection('Companies');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CompanySchema = new SimpleSchema({
  name: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Companies.attachSchema(CompanySchema);

/** Make the collection and schema available to other code. */
export { Companies, CompanySchema };
