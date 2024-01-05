import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import db from "@/app/utils/firebaseApp";
import { doc, getDoc } from "firebase/firestore";

async function getWordcloudData(id) {
  const docRef = doc(db, "wordclouds", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export const metadata = {
  title: `Wordcloud | Elalytics`,
};

export default async function Page({ params }) {
  const firestoreData = await getWordcloudData(params.wordcloudId);
  const wordcloudData = firestoreData.data;
  const title = firestoreData.chartTitle;
  return (
    <div>
      <WordCloudDraggableAndBilingual data={wordcloudData} bookName={title} />
    </div>
  );
}
