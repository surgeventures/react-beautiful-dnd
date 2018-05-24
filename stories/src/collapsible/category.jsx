// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from '../../../src/';
import type { DraggableProvided, DraggableStateSnapshot } from '../../../src/';
import type { Category as CategoryType, SubCategory as SubCategoryType } from './types';
import { colors, grid, borderRadius } from '../constants';

type Props = {|
  category: CategoryType,
  index: number,
|}

const Container = styled.div`
  border-bottom: 1px solid #ccc;
  background: ${colors.white};
  padding: ${grid}px;
  margin-bottom: ${grid}px;
  border-radius: ${borderRadius}px;
  font-size: 18px;
  ${({ isDragging }) => (isDragging ? 'box-shadow: 1px 1px 1px grey; background: lightblue' : '')}
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DragHandle = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  border: 0 none;
  background-color: ${colors.grey.darker};
`;

export const List = styled.ul`
  background: ${colors.grey.medium};
  display: block;
`;

const SubCategory = styled.li`
  color: ${colors.black};
`;

export default class Category extends Component<Props> {
  render() {
    const category: CategoryType = this.props.category;
    const index: number = this.props.index;

    return (
      <Draggable draggableId={category.id} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div>
            <Container
              innerRef={provided.innerRef}
              isDragging={snapshot.isDragging}
              {...provided.draggableProps}
            >
              <Header>
                {this.props.category.name}

                <DragHandle {...provided.dragHandleProps}>
                  <Line />
                  <Line />
                  <Line />
                </DragHandle>
              </Header>

              <List>
                {category.subcategories.map((subcategory: SubCategoryType) => (
                  <SubCategory key={subcategory.id}>{subcategory.name}</SubCategory>
                ))}
              </List>
            </Container>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}
