import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/StudentProfile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import { Notes } from '/imports/api/note/note';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Accept extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="connect-background">
          <div className="page-layer">
            <Container>
              <Header as="h2" textAlign="center" inverted>Application Acceptance</Header>
              <Card.Group>
                {this.props.profiles.map((profile, index) =>
                    <Profile key={index}
                             profile={profile}
                             notes={this.props.notes.filter(note => (note.profile === profile._id))}/>)}
              </Card.Group>
            </Container>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Accept.propTypes = {
  profiles: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    profiles: Profiles.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Accept);