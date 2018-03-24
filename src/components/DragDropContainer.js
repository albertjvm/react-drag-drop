import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from '../components/Draggable';
import Target from '../components/Target';

const Mask = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
`;

class DragDropContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragActive: false,
      dragX: null,
      dragY: null,
      offsetX: null,
      offsetY: null,
      activeDraggable: null,
      activeTarget: null,
    }
  }

  onDragStart = (id, offsetX, offsetY) => {
    this.setState({
      isDragActive: true,
      activeDraggable: id,
      offsetX: offsetX || 0,
      offsetY: offsetY || 0,
    });
  }

  onDragStop = () => {
    this.setState({
      isDragActive: false,
      activeDraggable: null
    });
    console.log(`${this.state.activeDraggable} --> ${this.state.activeTarget}`);
  }

  onDrag = (e) => {
    this.setState({
      dragX: e.screenX,
      dragY: e.screenY,
    });
  }

  onMouseMove = (e) => {
    if (this.state.isDragActive) {
      this.onDrag (e);
    }
  }

  targetIsDroppable = (target) => {
    this.setState({
      activeTarget: target
    });
  }

  render() {
    const { activeDraggable, isDragActive, dragX, dragY, offsetX, offsetY } = this.state;

    return (
      <div {...this.props}>
        { isDragActive ? 
          <Mask  onMouseUp={this.onDragStop} onMouseMove={this.onMouseMove} /> 
        : null }

        { this.props.children.map((child, index) => {
          if (child.props.draggable) {
            return (
              <Draggable key={index} id={index}
                onDragStart={this.onDragStart}
                onDragStop={this.onDragStop}
                x={dragX - offsetX} y={dragY - offsetY} isBeingDragged={activeDraggable === index}
              >
                {child}
              </Draggable>
            );
          } else if (child.props.droppable) {
            return (
            <Target key={index} id={index} targetIsDroppable={this.targetIsDroppable}
              dragX={dragX} dragY={dragY - 92} isDragActive={isDragActive}
            >
              {child}
            </Target>
            );
          } else {
            return child;
          }
        })}
      </div>
    );
  }
}

export default DragDropContainer;
