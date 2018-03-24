import React, { Component } from 'react';
import styled from 'styled-components';
import DragDropContainer from './components/DragDropContainer';

const Div = styled.div`
  height: 100px;
  width: 100px;
  background-color: #FF4136;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div2 = styled.div`
  height: 100px;
  width: 100px;
  background-color: greenyellow;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TargetDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 4;
  height: 100%;
`;

const Container = styled(DragDropContainer)`
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-auto-rows: 150px;
  grid-gap: 30px;
`;

class App extends Component {
  render() {
    return (
      <Container>
          <Div draggable>Drag Me!</Div>
          <Div2 draggable>Drag Me Too!</Div2>
          <TargetDiv droppable>Drag to here</TargetDiv>
          <div></div>
          <TargetDiv droppable>or here</TargetDiv>
      </Container>
    );
  }
}

export default App;
