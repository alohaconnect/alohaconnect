import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

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
          <Card.Content extra>
            <Link to={`/editProfile/${this.props.profile._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);