// FolderTreeView.stories.tsx
import React from 'react';
import { Meta } from '@storybook/react';

/**
 * ## Main Document
 */
export default {
  title: 'Experimental/FolderTreeView/Base',
  tags: ['autodocs'],
} as Meta;

/**
 * ### Document for each story
 */
export const Story1: React.FC = () => {
  const list = ["1", "2", 3, 4]
  return <p> {list}</p>;
};
