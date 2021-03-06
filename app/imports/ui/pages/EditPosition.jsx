import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Positions, PositionSchema } from '/imports/api/position/position';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditPosition extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, requirement, description, _id } = data;
    Positions.update(_id, { $set: { name, requirement, description } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const transparent={backgroundColor: 'transparent'};
    return (
      <div className="companybackground">
        <div className="page-layer">
          <Grid container centered>
            <Grid.Column>
              <Header as="h1" textAlign="center" inverted>Edit Position</Header>
              <AutoForm schema={PositionSchema} onSubmit={this.submit} model={this.props.doc}>
                <Segment style={transparent} className="addForms" inverted>
                  <TextField name='name'/>
                  <TextField name='description'/>
                  <TextField name="requirement" />
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

/** Require the presence of a Position document in the props object. Uniforms adds 'model' to the props, which we use. */
EditPosition.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params;
  // Get access to Position documents.
  const subscription = Meteor.subscribe('Position');
  console.log(documentId, match.params);
  return {
    doc: Positions.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditPosition);
