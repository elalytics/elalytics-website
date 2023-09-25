import SentenceLengthBarChart from "./SentenceLengthBarChart";
import data from "../sample-data/sentence-length-bar.json";

export default {
  title: "Charts/SentenceLengthBarChart",
  component: SentenceLengthBarChart,
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
    sourceData: data,
    bookName: "Wife Story",
    chartTitle: "Sentence Length Chart",
    xLabel: "Number of Words",
    yLabel: "Sentence",
  },
};
