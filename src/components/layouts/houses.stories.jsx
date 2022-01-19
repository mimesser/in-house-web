import HousesLayout from './houses.layout';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docsreact/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'HousesLayout',
  component: HousesLayout,
};

const Template = (args) => <HousesLayout {...args} />;

export const FirstStory = {
  args: { },
};
