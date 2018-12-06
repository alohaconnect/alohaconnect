import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Positions, PositionSchema } from '/imports/api/position/position';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PositionCardAdmin extends React.Component {

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
    if(confirm("Do you really wish to delete this position?")){
      Positions.remove(this.props.position._id, this.deleteCallback);
    }
  }

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
            <Link to={`/editposition/${this.props.position._id}`}>Edit</Link>
          </Card.Content>
          <Button color='red' onClick={this.onClick}>
              Delete
          </Button>
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