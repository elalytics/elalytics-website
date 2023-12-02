function filterWordCloudData(
  data,
  wordsToRemove,
  categoriesToRemove,
  numberOfWords
) {
  let filteredData = data.filter(
    (item) =>
      !wordsToRemove.includes(item.word) &&
      !categoriesToRemove.includes(item.category)
  );

  filteredData.sort((a, b) => b.value - a.value);

  // If n is null or undefined, return all words
  if (numberOfWords === null || numberOfWords === undefined) {
    return filteredData;
  }

  // Otherwise, return the top n elements
  let topNWords = filteredData.slice(0, numberOfWords);

  return topNWords;
}

export { filterWordCloudData };
