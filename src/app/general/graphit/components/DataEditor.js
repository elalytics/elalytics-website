import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUpLong,
  faDownLong,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getDoc, setDoc, doc, collection } from "firebase/firestore";
import db from "@/app/utils/firebaseApp";

const DataEditor = ({
  data,
  setData,
  title,
  setTitle,
  yRange,
  setYRange,
  graphItId,
}) => {
  return (
    <div>
      <TitleEditor title={title} updateTitle={setTitle} graphItId={graphItId} />
      <RangeEditor
        yRange={yRange}
        updateYRange={setYRange}
        graphItId={graphItId}
      />
      <LabelEditor
        consolidatedData={data}
        updateConsolidatedData={setData}
        graphItId={graphItId}
      />
      <ShareChart graphItId={graphItId} />
    </div>
  );
};
export default DataEditor;

const TitleEditor = ({ title, updateTitle, graphItId }) => {
  const [titleState, setTitle] = useState(title);
  async function updateTitleFirestore(title) {
    const graphRef = doc(collection(db, "graphit"), graphItId);
    await setDoc(
      graphRef,
      {
        title: title,
      },
      { merge: true }
    );
  }
  return (
    <div>
      <h5>Graph Title</h5>
      <input
        type="text"
        value={titleState}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        onClick={() => {
          updateTitle(titleState);
          updateTitleFirestore(titleState);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
      >
        Update
      </button>
    </div>
  );
};

const RangeEditor = ({ yRange, updateYRange, graphItId }) => {
  const [yRangeState, setYRange] = useState(yRange);
  async function updateYRangeFirestore(yRange) {
    const graphRef = doc(collection(db, "graphit"), graphItId);
    await setDoc(
      graphRef,
      {
        yRange: yRange,
      },
      { merge: true }
    );
  }
  return (
    <div>
      <h5>Y Range</h5>
      <input
        type="number"
        value={yRangeState.min}
        onChange={(e) => {
          setYRange({ ...yRangeState, min: Math.floor(e.target.value) });
        }}
      />
      <input
        type="number"
        value={yRangeState.max}
        onChange={(e) => {
          setYRange({ ...yRangeState, max: Math.floor(e.target.value) });
        }}
      />
      <button
        onClick={() => {
          updateYRange(yRangeState);
          updateYRangeFirestore(yRangeState);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
      >
        Update
      </button>
    </div>
  );
};

const LabelEditor = ({
  consolidatedData,
  updateConsolidatedData,
  graphItId,
}) => {
  // table like component to edit and add new labels
  const [data, setData] = useState(consolidatedData);
  const [newDataPoint, setNewDataPoint] = useState({ label: "", value: 0 });
  const [movingRowIndex, setMovingRowIndex] = useState(null);
  async function updateConsolidatedDataFirestore(data) {
    const graphRef = doc(collection(db, "graphit"), graphItId);
    await setDoc(
      graphRef,
      {
        data: data,
      },
      { merge: true }
    );
  }

  const moveRow = (index, direction) => {
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[index + direction];
    newData[index + direction] = temp;
    setData(newData);
    setTimeout(() => {
      setMovingRowIndex(index + direction);
    }, 0);
    setTimeout(() => {
      setMovingRowIndex(null);
    }, 300); // Reset after the same duration as your transition
  };
  return (
    <div className="font-sans">
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                className={index === movingRowIndex ? "bg-yellow-400" : ""}
              >
                <td>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].label = e.target.value;
                      setData(newData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].value = e.target.value;
                      setData(newData);
                    }}
                  />
                </td>
                <td>
                  {index > 0 && (
                    <button onClick={() => moveRow(index, -1)}>
                      <FontAwesomeIcon
                        className="text-black-50 hover:text-black-80 px-1"
                        icon={faUpLong}
                      />
                    </button>
                  )}
                  {index < data.length - 1 && (
                    <button onClick={() => moveRow(index, 1)}>
                      <FontAwesomeIcon
                        className="text-black-50 hover:text-black-80 px-1"
                        icon={faDownLong}
                      />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setData([
                        ...data.slice(0, index),
                        ...data.slice(index + 1),
                      ]);
                    }}
                  >
                    <FontAwesomeIcon
                      className="text-black-50 hover:text-black-80 px-1"
                      icon={faTrash}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <input
                type="text"
                value={newDataPoint.label}
                onChange={(e) => {
                  setNewDataPoint({ ...newDataPoint, label: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={newDataPoint.value}
                onChange={(e) => {
                  setNewDataPoint({ ...newDataPoint, value: e.target.value });
                }}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  setData([...data, newDataPoint]);
                  setNewDataPoint({ label: "", value: 0 });
                }}
              >
                <FontAwesomeIcon
                  className="text-black-50 hover:text-black-80 px-1"
                  icon={faCirclePlus}
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          updateConsolidatedData(data);
          updateConsolidatedDataFirestore(data);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
      >
        Update
      </button>
    </div>
  );
};

const ShareChart = ({ graphItId }) => {
  return (
    <div className="border-solid border-2 border-sky-500 p-2 rounded bg-black-30">
      <h2 className="text-2xl">Share Chart</h2>
      <div>
        <h6 className="font-bold">User Link</h6>
        <p className="p-2 bg-black-10 border-solid border-2 border-black-40 rounded">
          {`${window.location.origin}/general/graphit/${graphItId}`}{" "}
        </p>
      </div>
      <div>
        <h6 className="font-bold">Admin Link</h6>
        <p className="p-2 bg-black-10 border-solid border-2 border-black-40 rounded">{`${window.location.origin}/general/graphit/admin/${graphItId}`}</p>
      </div>
      <div></div>
    </div>
  );
};
