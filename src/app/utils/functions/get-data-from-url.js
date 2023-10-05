import { headers } from "next/headers";
async function getDataFromUrl(url) {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto");
  console.log("host", host);
  console.log("protocol", protocol);
  let response = await fetch(`${protocol}://${host}/api/fetch-data`, {
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

export { getDataFromUrl };
