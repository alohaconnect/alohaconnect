import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid, Icon, Segment, Divider } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/StudentProfile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class StudentHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="connect-background">
          <div className="layer">
            <Segment>
              <Header as="h2" textAlign="center">Student Home Page</Header>
              <Divider/>
              <Grid container centered columns={3}>
                <Grid.Row>
                  <Grid.Column textAlign='center' className='landingText'>
                    <Icon size='huge' name='graduation cap'/>
                    <Header as='h1'>Student or Recent Graduate?</Header>
                    <Header as='h3'>Looking for an internship or a job?</Header>
                  </Grid.Column>
                  <Grid.Column textAlign='center' className='landingText'>
                    <Icon size='huge' name='address card'/>
                    <Header as='h1'>Sign Up!</Header>
                    <Header as='h3'>Create a professional listing and highlight your accomplishments!</Header>
                  </Grid.Column>
                  <Grid.Column textAlign='center' className='landingText'>
                    <Icon size='huge' name='handshake'/>
                    <Header as='h1'>Get Connected!</Header>
                    <Header as='h3'>Connect with local companies to kick start your career!</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
StudentHome.propTypes = {
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
})(StudentHome);
