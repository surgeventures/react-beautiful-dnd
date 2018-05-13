// @flow
import type { Category } from './types';

const categories: Category[] = [
  {
    id: '1',
    name: 'Food',
    subcategories: [
      {
        id: '1',
        name: 'Lasagna',
      },
      {
        id: '2',
        name: 'Spaghetti',
      },
      {
        id: '3',
        name: 'Pizza',
      },
      {
        id: '4',
        name: 'Cannelloni',
      },
    ],
  },
  {
    id: '2',
    name: 'Cosmetics',
    subcategories: [
      {
        id: '5',
        name: 'Cream',
      },
      {
        id: '6',
        name: 'Shampoo',
      },
      {
        id: '7',
        name: 'Conditioner',
      },
    ],
  },
  {
    id: '3',
    name: 'Cleaning',
    subcategories: [
      {
        id: '8',
        name: 'Cleaning gel',
      },
      {
        id: '9',
        name: 'Window cleaner',
      },
      {
        id: '10',
        name: 'Laundry detergent',
      },
    ],
  },
  {
    id: '4',
    name: 'Drinks',
    subcategories: [
      {
        id: '11',
        name: 'Coffee',
      },
      {
        id: '12',
        name: 'Tea',
      },
      {
        id: '13',
        name: 'Soda',
      },
    ],
  },
];

export default categories;
