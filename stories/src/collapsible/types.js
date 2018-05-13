// @flow
import type { Id } from '../types';

export type SubCategory = {|
  id: string,
  name: string,
|};

export type Category = {|
  id: Id,
  name: string,
  subcategories: SubCategory[]
|};
