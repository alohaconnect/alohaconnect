import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='connect-background'>
          <Grid container centered columns={3}>
            <Grid.Row>
              <Grid.Column textAlign='center' className='landingText'>
                <Icon size='huge' name='graduation cap' inverted/>
                <Header as='h1' inverted>Student or Recent Graduate?</Header>
                <Header as='h3' inverted>Looking for an internship or a job?</Header>
              </Grid.Column>
              <Grid.Column textAlign='center' className='landingText'>
                <Icon size='huge' name='address card' inverted/>
                <Header as='h1' inverted>Sign Up!</Header>
                <Header as='h3' inverted>Create a professional listing and highlight your accomplishments!</Header>
              </Grid.Column>
              <Grid.Column textAlign='center' className='landingText'>
                <Icon size='huge' name='handshake' inverted/>
                <Header as='h1' inverted>Get Connected!</Header>
                <Header as='h3' inverted>Connect with local companies to kick start your career!</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column textAlign='center' className='landingText'>
                <Icon size='huge' name='building' inverted/>
                <Header as='h1' inverted>Local Company?</Header>
                <Header as='h3' inverted>Looking for talented individuals in your area?</Header>
              </Grid.Column>
              <Grid.Column textAlign='center' className='landingText'>
                <Icon size='huge' name='file alternate outline' inverted/>
                <Header as='h1' inverted>Create a Job Posting!</Header>
                <Header as='h3' inverted>List your company's job opportunites.</Header>
              </Grid.Column>
              <Grid.Column textAlign='center' className='landingText'>
                <Icon size='huge' name='handshake' inverted/>
                <Header as='h1' inverted>Get Connected!</Header>
                <Header as='h3' inverted>Match up with local talent.</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>  
    );
  }
}

export default Landing;
