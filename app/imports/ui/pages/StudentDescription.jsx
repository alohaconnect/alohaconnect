import React from 'react';
import { Profiles, ProfileSchema } from '/imports/api/profile/StudentProfile';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class StudentDescription extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, education, degree, experience } = data;
    const owner = Meteor.user().username;
    Profiles.insert({ name, education, degree, experience, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <div className="connect-background">
        <div className="layer">
          <Grid container centered>
            <Grid.Column>
              <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ProfileSchema} onSubmit={this.submit}>
                <Segment>
                  <Header as="h2" textAlign="center">Student Profile</Header>
                  <Divider />
                  <TextField name='name'/>
                  <TextField name='education'/>
                  <TextField name='degree'/>
                  <TextField name='experience'/>
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

export default StudentDescription;
