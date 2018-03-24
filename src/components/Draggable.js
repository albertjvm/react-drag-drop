import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  -webkit-user-drag: none;
`;

const Shadow = styled.div`
  opacity: 0.5;
  position: absolute;
`;

class Draggable extends Component {
  startDrag = (e) => {
    let rect = e.target.getBoundingClientRect();
    let offsetX = e.screenX - rect.left;
    let offsetY = e.screenY - rect.top;
    
    this.props.onDragStart(this.props.id, offsetX, offsetY);
  }

  stopDrag = () => {
    this.props.onDragStop();
  }

  render() {
    const { isBeingDragged, x, y } = this.props;
    return (
      <Wrapper onMouseDown={this.startDrag}>
        { this.props.children }
        { isBeingDragged ? 
          <Shadow style={{
            left: x,
            top: y
          }}>
            { this.props.children }
          </Shadow>
        : null }
      </Wrapper>
    )
  }
}

export default Draggable;