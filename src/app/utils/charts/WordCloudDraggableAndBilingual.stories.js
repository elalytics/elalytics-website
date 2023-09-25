import WordCloudDraggableAndBilingual from "./WordCloudDraggableAndBilingual";
import data from "../sample-data/word-cloud-bilingual.json";

export default {
  title: "Charts/WordCloudDraggableAndBilingual",
  component: WordCloudDraggableAndBilingual,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  //   More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
};

export const Primary = {
  args: {
    data: data,
    categoriesToRemove: ["PROPN", "PART", "ADP", "DET", "AUX", "PUNCT"],
    wordsToRemove: ["I"],
    bookName: "Boy",
    wordCloudTitle: "Most Frequent Words",
  },
};
