// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from '../../../src/';
import Category from './category';
import type { DroppableProvided } from '../../../src/';
import type { Category as CategoryType } from './types';
import { colors, grid, borderRadius } from '../constants';

type Props = {|
  categories: CategoryType[],
  title: string,
  isCollapsed: boolean,
|}

const Container = styled.div`
  width: 300px;
  background-color: ${colors.grey.dark};
  border-radius: ${borderRadius}px;
`;

const Title = styled.h3`
  font-weight: bold;
  padding: ${grid}px;
`;

const List = styled.div`
  padding: ${grid}px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
`;

export default class CategoryList extends Component<Props> {
  render() {
    const isCollapsed = this.props.isCollapsed;

    return (
      <Droppable droppableId="list">
        {(provided: DroppableProvided) => (
          <Container
            innerRef={provided.innerRef}
            {...provided.droppableProps}
          >
            <Title>{this.props.title}</Title>
            <List>
              {this.props.categories.map((category: CategoryType, index: number) => (
                <Category
                  key={category.id}
                  category={category}
                  index={index}
                  isCollapsed={isCollapsed}
                />
              ))}
            </List>
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );
  }
}
