import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  &.active {
    border: 2px dashed grey;
  }
  &.droppable {
    border-width: 4px;
  }
`;

class Target extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppable: false
    }
  }

  componentDidUpdate() {
    const { dragX, dragY } = this.props;
    const node = ReactDom.findDOMNode(this.refs.wrapper);

    let droppable = false;
    if (node) {
      const rect = node.getBoundingClientRect();
      
      if (dragX > rect.x && dragX < rect.x + rect.width) {
        if (dragY > rect.y && dragY < rect.y + rect.height) {
          droppable = true;
        }
      }
    }

    if (droppable !== this.state.droppable) {
      this.props.targetIsDroppable(this.props.id);
      this.setState({
        droppable: droppable
      });
    }
  }

  render () {
    const { isDragActive } = this.props;
    const { droppable } = this.state;
    
    return (
      <Wrapper
        ref="wrapper"
        className={`
          ${isDragActive ? 'active' : ''} 
          ${droppable ? 'droppable' : ''} 
          ${this.props.className}
        `}
        style={this.props.style}
      >
        {this.props.children}
      </Wrapper>
    );
  }
}

Target.propTypes = {
  isDragActive: PropTypes.bool.isRequired,
}

export default Target;
