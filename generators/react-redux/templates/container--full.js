import {
  connect,
} from 'react-redux';

import Component from './component';

export default connect(
  // mapStateToProps
  (state, ownProps) => {},
  // mapDispatchToProps
  (dispatch, ownProps) => {},
)(Component);
