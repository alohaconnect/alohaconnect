import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PositionCardAdmin extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.position.name}</Card.Header>
            <Card.Meta>{this.props.position.requirement}</Card.Meta>
            <Card.Description>
              {this.props.position.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.position.owner}
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.position._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
PositionCardAdmin.propTypes = {
  position: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PositionCardAdmin);