function filterWordCloudData(data, wordsToRemove, categoriesToRemove) {
  return data.filter(
    (item) =>
      !wordsToRemove.includes(item.word) &&
      !categoriesToRemove.includes(item.category)
  );
}

export { filterWordCloudData };
