import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px' };
    if (this.props.profile === 'student') this.navLink = "/studenthome";
    else if (this.props.profile === 'company') this.navLink = "/companyhome";
    else if (Roles.userIsInRole(Meteor.userId(), 'admin')) this.navLink = "/adminhome";
    else this.navLink = "/";
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to={this.navLink}>
          <Image src='/images/AlohaConnectLogo.png' size='small'/> 
        </Menu.Item>

        {(this.props.profile === 'student') ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/studentadd" key='studentadd'>Add Profile</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/joblist" key='joblist'>Potential Jobs</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/accept" key='accept'>Application Acceptance</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/studenthome" key='studenthome'>Home Page</Menu.Item>]
        ) : ''}

        {(this.props.profile === 'company') ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/companyadd" key='companyadd'>Add Position</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/liststudent" key='liststudent'>Find Applicants</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/companyhome" key='companyhome'>Home Page</Menu.Item>]
        ) : ''}

        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/adminhome" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up as Student" as={NavLink} exact to="/signupstudent"/>
                <Dropdown.Item icon="add user" text="Sign Up as Company" as={NavLink} exact to="/signupcompany"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  profile: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  profile: Meteor.user() ? Meteor.user().profile : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
