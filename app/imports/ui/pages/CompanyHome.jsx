import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Positions } from '/imports/api/position/position';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import PositionItem from '../components/PositionItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CompanyHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Company Home Page</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Requirement</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
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
CompanyHome.propTypes = {
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
})(CompanyHome);
