import React from 'react';
import { Positions, PositionSchema } from '/imports/api/position/position';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { _ } from 'meteor/underscore';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddPositionCard extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
    this.setState = this.setState.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, requirement, description } = data;
    const owner = Meteor.user().username;
    Positions.insert({ name, requirement, description, owner }, this.insertCallback);
  }


  change(event) {
    const target = event.target;
    if (target.checked) {
      let temp = this.state.input;
      temp = temp.split(',');
      temp.push(target.name);
      let uniq = _.uniq(temp);
      uniq = uniq.toString();
      if (uniq[0] === ',') {
        uniq = uniq.substr(1);
      }
      this.setState({ input: uniq });
      console.log(`added ${this.state.input}`);
    } else {
      let temp = this.state.input;
      temp = temp.split(',');
      temp.splice(temp.indexOf(target.name), 1);
      this.setState({ input: temp.toString() });
      console.log(`removed ${this.state.input}`);
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Position Card ver</Header>
            <div>
              <h3>Select required skills</h3>
              <input type='checkbox' name='Javascript' onChange={this.change}/><span>Javascript</span>
              <input type='checkbox' name='Python' onChange={this.change}/><span>Python</span>
              <input type='checkbox' name='Java' onChange={this.change}/><span>Java</span>
              <input type='checkbox' name='C' onChange={this.change}/><span>C</span>
              <input type='checkbox' name='C++' onChange={this.change}/><span>C++</span>
              <input type='checkbox' name='HTML&CSS' onChange={this.change}/><span>HTML&CSS</span>
              <input type='checkbox' name='PHP' onChange={this.change}/><span>PHP</span>
              <input type='checkbox' name='Linux' onChange={this.change}/><span>Linux</span>
              <input type='checkbox' name='Git' onChange={this.change}/><span>Git</span>
              <input type='checkbox' name='C#' onChange={this.change}/><span>C#</span>
              <input type='checkbox' name='MongoDB' onChange={this.change}/><span>MongoDB</span>
            </div>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={PositionSchema} onSubmit={this.submit} >
              <Segment>
                <TextField name='name'/>
                <TextField name='description'/>
                <HiddenField name='requirement' value={this.state.input}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddPositionCard;
