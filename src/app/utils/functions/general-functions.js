import { headers } from "next/headers";

function filterWordCloudData(data, wordsToRemove, categoriesToRemove) {
  return data.filter(
    (item) =>
      !wordsToRemove.includes(item.word) &&
      !categoriesToRemove.includes(item.category)
  );
}

async function getDataFromUrl(url) {
  const host = headers().get("host");
  let response = await fetch(`http://${host}/api/fetch-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      url: url,
    }),
  });

  let status = response.status;
  if (status === 200) {
    let responseData = await response.json();
    return responseData.data;
  } else {
    let data = await response.json();
    throw data.error;
  }
}

export { filterWordCloudData, getDataFromUrl };
