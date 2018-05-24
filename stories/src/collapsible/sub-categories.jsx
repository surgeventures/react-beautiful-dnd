// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import CategoryList from './category-list';
import initial from './data';
import reorder from '../reorder';
import { DragDropContext } from '../../../src/';
import type {
  DragStart,
  DropResult,
  DraggableLocation,
} from '../../../src/';
import type { Category } from './types';
import { List } from './category';

type State = {|
  categories: Category[],
|}

const publishBeforeSnapshot = action('beforeSnapshot');
const publishOnDragStart = action('onDragStart');
const publishOnDragEnd = action('onDragEnd');

const collapsedClassName = 'collapsed';

const Container = styled.div`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &.${collapsedClassName} {
    
    & ${List} {
      display: none;
    }
  }
`;

export default class SubCategories extends Component<*, State> {
  state: State = {
    categories: initial,
  }

  // in?
  onDragStart = (start: DragStart): void => {
    publishOnDragStart(start);
    /*
    this.container.classList.add(collapsedClassName);
    */
  };

  onDragEnd = (result: DropResult): void => {
    publishOnDragEnd(result);

    this.container.classList.remove(collapsedClassName);

    if (result.reason === 'CANCEL') { return; }
    const destination: ?DraggableLocation = result.destination;
    if (!destination) { return; }

    const categories: Category[] = reorder(
      this.state.categories,
      result.source.index,
      destination.index,
    );

    this.setState({
      categories,
    });
  }

  beforeSnapshot = (): void => {
    publishBeforeSnapshot();

    this.container.classList.add(collapsedClassName);
  }

  setRef = (ref) => {
    this.container = ref;
  }

  render() {
    return (
      <DragDropContext
        beforeSnapshot={this.beforeSnapshot}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Container innerRef={this.setRef}>
          <CategoryList
            title="Categories"
            categories={this.state.categories}
          />
        </Container>
      </DragDropContext>
    );
  }
}
