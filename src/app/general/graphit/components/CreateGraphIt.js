"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Fingerprint2 from "fingerprintjs2";
import { getDoc, setDoc, doc, collection } from "firebase/firestore";
import db from "@/app/utils/firebaseApp";

const CreateGraphIt = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createGraphIt = async () => {
    setLoading(true);
    let graphItInstanceId;
    let graphRef;
    let docSnap;

    do {
      // Generate a unique fingerprint for the user's device
      const components = await Fingerprint2.getPromise();
      const values = components.map((component) => component.value);
      const murmur = Fingerprint2.x64hash128(values.join(""), 31);

      // Create a unique 8-digit number based on the user's device fingerprint and the current timestamp
      graphItInstanceId = parseInt((murmur + Date.now()).slice(-8));

      // Use the instance ID as the document name
      graphRef = doc(collection(db, "graphit"), graphItInstanceId.toString());

      // Check if the document already exists
      docSnap = await getDoc(graphRef);
    } while (docSnap.exists());

    await setDoc(graphRef, {
      title: "Graph Title",
      data: [
        { label: "Label 1", value: 10 },
        { label: "Label 2", value: 10 },
        { label: "Label 3", value: 10 },
        { label: "Label 4", value: 10 },
        { label: "Label 5", value: 10 },
        { label: "Label 6", value: 10 },
      ],
      yRange: {
        min: 0,
        max: 100,
      },
    });

    // Redirect to the new page
    router.push(`/general/graphit/admin/${graphItInstanceId}`);
  };

  const handleCreate = async () => {
    console.log("Creating GraphIt");
    await createGraphIt();
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
        onClick={handleCreate}
      >
        Create DIY Graph
      </button>
      {loading && <p>Creating... This might take a minute...</p>}
    </div>
  );
};

export default CreateGraphIt;
