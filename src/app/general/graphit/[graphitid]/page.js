import DraggableDynamicChart from "../components/DraggableDynamicChart";
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

export const metadata = {
  title: `GraphIt | Elalytics`,
};

export default async function Page({ params }) {
  const firestoreData = await getGraphitData(params.graphitid);
  let graphDataPoints = firestoreData.data.map((item) => {
    return { label: item.label, value: 0 };
  });
  const title = firestoreData.title;
  const yRange = firestoreData.yRange;
  const graphItInstanceId = params.graphitid;

  return (
    <div>
      <DraggableDynamicChart
        data={graphDataPoints}
        IsEditMode={false}
        yRange={yRange}
        graphTitle={title}
        graphItId={graphItInstanceId}
      />
    </div>
  );
}
