// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import SubCategories from './src/collapsible/sub-categories';

storiesOf('Collapsible Items', module)
  .add('single list', () => (
    <SubCategories />
  ));
