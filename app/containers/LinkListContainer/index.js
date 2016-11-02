/*
 *
 * LinkListContainer
 *
 */

//to Generate Container or components run npm run generate container or npm run generate component
import React from 'react';
import { connect } from 'react-redux';
import selectLinkListContainer from './selectors';
import LinkList from '../../components/LinkList';
import { requestLinks } from './actions';

export class LinkListContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    topicName: React.PropTypes.string.isRequired,
    requestLinks: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.requestLinks(this.props.topicName);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.topicName !== this.props.topicName) {
      this.props.requestLinks(newProps.topicName);
    }
  }

  render() {
    return (
      <LinkList {...this.props}/>
    );
  }
}

const mapStateToProps = selectLinkListContainer();

function mapDispatchToProps(dispatch) {
  return {
    requestLinks: (topicName) => dispatch(requestLinks(topicName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkListContainer);
