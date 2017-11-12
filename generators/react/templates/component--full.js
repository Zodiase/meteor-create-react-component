import React from 'react';
import PropTypes from 'prop-types';

export default class NewComponent extends React.Component {
  static propTypes = {
    // ...
  };

  static defaultProps = {
    // ...
  };

  constructor (props) {
    super(props);

    this.state = {
      // ...
    };

    // ...
  }

  render () {
    // ...

    return null;
  }
}
