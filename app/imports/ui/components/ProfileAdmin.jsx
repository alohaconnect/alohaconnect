import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Profiles, ProfileSchema } from '/imports/api/profile/StudentProfile';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileAdmin extends React.Component {
  
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.deteCallback = this.deleteCallback.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
      this.formRef.reset();
    }
  }

  onClick() {
    if(confirm("Do you really wish to delete this profile?")){
      Profiles.remove(this.props.profile._id, this.deleteCallback);
    }
  }
  
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
            {this.props.profile.owner}
          </Card.Content>
          <Card.Content extra>
            <Link to={`/editprofile/${this.props.profile._id}`}>Edit</Link>
          </Card.Content>
          <Button color='red' onClick={this.onClick}>
              Delete
          </Button>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileAdmin.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileAdmin);