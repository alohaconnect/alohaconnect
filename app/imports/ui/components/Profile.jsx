import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Note from '/imports/ui/components/Note';
import AddNote from '/imports/ui/components/AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.profile.name}</Card.Header>
            <Card.Meta>{this.props.profile.education}</Card.Meta>
            <Card.Meta>{this.props.profile.degree}</Card.Meta>
            <Card.Meta>{this.props.profile.experience}</Card.Meta>
          </Card.Content>
          { Meteor.user().profile === 'student' &&
            <Card.Content extra>
              <Link to={`/editprofile/${this.props.profile._id}`}>Edit</Link>
            </Card.Content>
          }
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddNote owner={this.props.profile.owner} profile={this.props.profile._id}/>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  profile3: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);