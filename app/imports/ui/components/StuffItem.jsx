import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Stuffs, StuffSchema } from '/imports/api/stuff/stuff';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Deletion failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Deletion succeeded' });
    }
  }

  onClick(data) {
    const { name, quantity, condition, _id } = data;
    Stuffs.remove(_id, { $set: { name, quantity, condition } });
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.quantity}</Table.Cell>
          <Table.Cell>{this.props.stuff.condition}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
          </Table.Cell>
          <Table.Cell ref={this.onClick(this._id)}>
            Delete
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
