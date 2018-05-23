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

type State = {|
  categories: Category[],
  isCollapsed: boolean,
|}

const publishBeforeSnapshot = action('beforeSnapshot');
const publishOnDragStart = action('onDragStart');
const publishOnDragEnd = action('onDragEnd');

const Container = styled.div`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class SubCategories extends Component<*, State> {
  state: State = {
    categories: initial,
    isCollapsed: false,
  }

  // in?
  onDragStart = (start: DragStart): void => {
    publishOnDragStart(start);
    return new Promise((resolve) => {
      this.setState({
        isCollapsed: true,
      }, () => {
        resolve();
      });
    });
  };

  onDragEnd = (result: DropResult): void => {
    publishOnDragEnd(result);
    this.setState({ isCollapsed: false });

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
  }

  render() {
    const isCollapsed = this.state.isCollapsed;

    return (
      <DragDropContext
        beforeSnapshot={this.beforeSnapshot}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          <CategoryList
            title="Categories"
            categories={this.state.categories}
            isCollapsed={isCollapsed}
          />
        </Container>
      </DragDropContext>
    );
  }
}
