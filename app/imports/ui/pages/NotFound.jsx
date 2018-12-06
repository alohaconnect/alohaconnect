import React from 'react';
import { Header } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    return (
      <div className="connect-background">
        <div className="layer">
          <Header as="h2" textAlign="center" inverted>
            <p>Page not found</p>
          </Header>
        </div>
      </div>
    );
  }
}

export default NotFound;
