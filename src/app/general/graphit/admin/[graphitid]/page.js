import DraggableDynamicChart from "../../components/DraggableDynamicChart";
import db from "@/app/utils/firebaseApp";
import { doc, getDoc } from "firebase/firestore";

async function getGraphitData(id) {
  const docRef = doc(db, "graphit", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const firestoreData = await getGraphitData(params.graphitid);
  const title = firestoreData.title;
  return {
    title: `${title} | Admin - GraphIt | Elalytics`,
  };
}

export default async function Page({ params }) {
  const firestoreData = await getGraphitData(params.graphitid);
  const graphDataPoints = firestoreData.data;
  const title = firestoreData.title;
  const yRange = firestoreData.yRange;
  const graphItInstanceId = params.graphitid;
  const xTitle = firestoreData.xTitle ? firestoreData.xTitle : "";
  const yTitle = firestoreData.yTitle ? firestoreData.yTitle : "";

  return (
    <div>
      <DraggableDynamicChart
        data={graphDataPoints}
        IsEditMode={true}
        yRange={yRange}
        graphTitle={title}
        graphItId={graphItInstanceId}
        yTitle={yTitle}
        xTitle={xTitle}
      />
    </div>
  );
}
