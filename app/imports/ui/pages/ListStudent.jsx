import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Profiles} from '/imports/api/profile/StudentProfile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProfileAdmin from '../components/ProfileAdmin';
import { Card } from 'semantic-ui-react/dist/commonjs/views/Card/Card';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStudent extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List of Potential Student</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Card.Group>
              {this.props.profiles.map((profile, index)=> <ProfileAdmin key={index} profile={profile}/>)}
            </Card.Group>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudent.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStudent);
