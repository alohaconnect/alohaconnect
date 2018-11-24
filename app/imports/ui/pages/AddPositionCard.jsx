import React from 'react';
import { Positions, PositionSchema } from '/imports/api/position/position';
import { Grid, Segment, Header, Dropdown, Select,Label, Form , Field} from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SelectField from 'uniforms-semantic/SelectField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

let input = [];
const options = [
  { key: 'java', text: 'java', value: 'java' },
  { key: 'python', text: 'python', value: 'python' },
];

/** Renders the Page for adding a document. */
class AddPositionCard extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, requirement, description } = data;
    const owner = Meteor.user().username;
    Positions.insert({ name, requirement, description, owner }, this.insertCallback);
  }


  change(data) {
    console.log(data.target);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Position Card ver</Header>
            <Dropdown placeholder='Skills' fluid multiple selection options={options} onChange = {this.change} >
            </Dropdown>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={PositionSchema} onSubmit={this.submit} >
              <Segment>
                <TextField name='name'/>
                <TextField name='description'/>
                <ListAdd name='requirement' options={options} disable='enable'>
                </ListAdd>
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
