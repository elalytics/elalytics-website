"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import { split } from "sentence-splitter";
import chroma from "chroma-js";
import PropTypes, { shape } from "prop-types";
import BookNameTag from "../components/BookNameTag";
import ChartTitle from "../components/ChartTitle";
import stanfordColors from "../styles/stanfordColors";
import { barChartAxisTitle } from "../styles/chartjsDefaultStyles";

const ChartComponent = ({ sourceData, showTooltip, xLabel, yLabel }) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  Chart.register(annotationPlugin);
  let barThickness = 1.5;
  useEffect(() => {
    let numberOfWordsInEachLine = (() => {
      let result = [];
      sourceData.forEach((item) => {
        if (Array.isArray(item.lines)) {
          // Iterate through each line and push word counts
          item.lines.forEach((item) => {
            result.push(item.wordCount);
          });
        } else {
          // Handle the case where wordCount is not an array (last line)
          result.push(item.wordCount);
        }
      });
      return result;
    })();

    let paragraphNumber = (() => {
      let result = [];
      sourceData.forEach((paragraph) => {
        if (Array.isArray(paragraph.lines)) {
          // Iterate through each line and push word counts
          paragraph.lines.forEach((item) => {
            result.push(paragraph.paragraph);
          });
        } else {
          // Handle the case where wordCount is not an array (last line)
          result.push(paragraph.paragraph);
        }
      });
      return result;
    })();

    let numberOfParagraphs = sourceData.length;

    //generate colors based on number of paragraphs as an array of colors using chroma
    function deterministicShuffle(array, seed) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(seed * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    let paragraphColors = Array(numberOfParagraphs)
      .fill()
      .map((_, index) =>
        chroma
          .scale([
            "red",
            "blue",
            "yellow",
            "green",
            "purple",
            "brown",
            "orange",
            "pink",
            "skyblue",
            "gray",
            "lime",
            "teal",
            "indigo",
          ])
          .mode("lch")(index / numberOfParagraphs)
          .luminance(0.4) // Adjust the luminance to make the colors lighter
          .saturate(1) // Adjust the saturation to make the colors more vibrant
          .hex()
      );

    paragraphColors = deterministicShuffle(paragraphColors, Math.sqrt(2) - 1);

    let paragraphBarColor = (() => {
      let result = [];
      let colors = [stanfordColors["bright-blue"], stanfordColors["stone"]];
      sourceData.forEach((paragraph) => {
        if (Array.isArray(paragraph.lines)) {
          // Iterate through each line and push word counts
          paragraph.lines.forEach((item) => {
            result.push(colors[parseInt(paragraph.paragraph, 10) % 2]);
          });
        } else {
          // Handle the case where wordCount is not an array (last line)
          result.push(colors[parseInt(paragraph.paragraph, 10) % 2]);
        }
      });
      return result;
    })();

    let lines = (() => {
      let result = [];
      sourceData.forEach((item) => {
        if (Array.isArray(item.lines)) {
          // Iterate through each line and push word counts
          item.lines.forEach((item) => {
            result.push(item.line);
          });
        } else {
          // Handle the case where wordCount is not an array (last line)
          result.push(item.line);
        }
      });
      return result;
    })();

    const createSequentialArray = (length) => {
      return Array.from({ length }, (_, i) => i + 1);
    };

    let numberOfLines = createSequentialArray(numberOfWordsInEachLine.length);

    let data = {
      labels: [...numberOfLines, null],
      datasets: [
        {
          label: [...numberOfLines, null],
          data: [...numberOfWordsInEachLine, null],
          backgroundColor: [...paragraphBarColor, null],
          paragraph: [...paragraphNumber, null],
          toolTip: lines,
          cubicInterpolationMode: "monotone",
          barPercentage: 0.9, // Adjust this value as needed
          categoryPercentage: 0.7, // Adjust this value as needed
        },
      ],
    };
    setChartData(data);
  }, [sourceData]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const myChartRef = chartContainer.current.getContext("2d");
      if (chartInstance.current) {
        // if a chart instance exists
        chartInstance.current.destroy(); // destroy it
      }

      let chartHeight = chartData.datasets[0].data.length * barThickness;
      myChartRef.canvas.height = chartHeight;
      chartInstance.current = new Chart(myChartRef, {
        type: "bar",
        data: chartData,

        options: {
          indexAxis: "y",
          plugins: {
            annotation: {
              annotations: {},
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.toolTip[context.dataIndex]
                      .split(" ")
                      .slice(0, 6)
                      .join(" ") + "..."
                  );
                },
                title: function (context) {
                  return (
                    "Sentence " +
                      context[0].label +
                      " - " +
                      context[0].formattedValue +
                      " Words" +
                      " - " +
                      "Paragraph " +
                      context[0].dataset.paragraph[context[0].dataIndex] || ""
                  );
                },
              },
            },
            legend: {
              display: false, // whether to display the legend
            },
          },

          scales: {
            y: {
              grace: "5%",

              beginAtZero: true,
              title: {
                ...barChartAxisTitle,
                display: true,
                text: yLabel,
              },
            },
            x: {
              grace: "5%",
              position: "top",

              title: {
                ...barChartAxisTitle,
                display: true,
                text: xLabel,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    }
  }, [chartContainer, chartData]);

  if (chartData === undefined || chartData === null) {
    return <div>loading</div>;
  }

  return (
    <div className="w-full">
      <canvas ref={chartContainer} />
    </div>
  );
};

function getLineLength(inputData) {
  let data = inputData;
  const result = data.map((item) => {
    const paragraphLines = split(item.paragraphText)
      .map((sentence) => sentence.raw)
      .filter((line) => line.trim() !== ""); // Filter out empty or whitespace-only lines

    let linesWithWordCount = paragraphLines.map((line) => ({
      line: line.trim(),
      wordCount: line
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "").length,
    }));

    // Check if the last line has zero word count and remove it
    if (
      linesWithWordCount.length > 0 &&
      linesWithWordCount[linesWithWordCount.length - 1].wordCount === 0
    ) {
      linesWithWordCount.pop();
    }

    return {
      paragraph: item.paragraph,
      sentimentScore: item.sentimentScore,
      paragraphText: item.paragraphText,
      lines: linesWithWordCount,
    };
  });

  return result;
}

const SentenceLengthBarChart = ({
  bookName,
  chartTitle,
  sourceData,
  showTooltip,
  showNote = true,
  xLabel,
  yLabel,
}) => {
  return (
    <div>
      <div className="overflow-x-hidden">
        <div className="text-center">
          {bookName && <BookNameTag bookName={bookName} />}
          {chartTitle && <ChartTitle chartTitle={chartTitle} />}
        </div>
        <div className=" m-auto">
          {showNote && (
            <div className="mt-4">
              <p className="text-center italic">
                Each color group corresponds to a paragraph
              </p>
            </div>
          )}

          <ChartComponent
            sourceData={getLineLength(sourceData)}
            showTooltip={showTooltip}
            yLabel={yLabel}
            xLabel={xLabel}
          />
        </div>
      </div>
    </div>
  );
};

SentenceLengthBarChart.propTypes = {
  bookName: PropTypes.string,
  chartTitle: PropTypes.string,
  sourceData: PropTypes.arrayOf(
    shape({
      paragraph: PropTypes.string.isRequired,
      paragraphText: PropTypes.string.isRequired,
    })
  ).isRequired,
  showTooltip: PropTypes.bool,
  showNote: PropTypes.bool,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

export default SentenceLengthBarChart;
