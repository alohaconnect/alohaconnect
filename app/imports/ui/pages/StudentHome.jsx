import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Positions } from '/imports/api/position/position';
import PositionItem from '/imports/ui/components/PositionItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class StudentHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Student Home Page</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Education</Table.HeaderCell>
                <Table.HeaderCell>Abilities</Table.HeaderCell>
                <Table.HeaderCell>Experience</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.positions.map((position) => <PositionItem key={position._id} position={position} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
StudentHome.propTypes = {
  positions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Position');
  return {
    positions: Positions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(StudentHome);
