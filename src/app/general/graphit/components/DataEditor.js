import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUpLong,
  faDownLong,
  faCirclePlus,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getDoc, setDoc, doc, collection } from "firebase/firestore";
import db from "@/app/utils/firebaseApp";
import { Tooltip } from "react-tooltip";

const DataEditor = ({
  data,
  setData,
  title,
  setTitle,
  yTitle,
  setYTitle,
  xTitle,
  setXTitle,
  yRange,
  setYRange,
  graphItId,
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <TitleEditor
          title={title}
          updateTitle={setTitle}
          graphItId={graphItId}
        />
      </div>
      <div>
        <SubHeading>Y Axis</SubHeading>
        <YTitleEditor
          yTitle={yTitle}
          updateYTitle={setYTitle}
          graphItId={graphItId}
        />
        <RangeEditor
          yRange={yRange}
          updateYRange={setYRange}
          graphItId={graphItId}
        />
      </div>
      <div>
        <SubHeading>X Axis</SubHeading>
        <XTitleEditor
          xTitle={xTitle}
          updateXTitle={setXTitle}
          graphItId={graphItId}
        />
        <LabelEditor
          consolidatedData={data}
          updateConsolidatedData={setData}
          graphItId={graphItId}
        />
      </div>
      <div>
        <ShareChart graphItId={graphItId} />
      </div>
    </div>
  );
};
export default DataEditor;

const SubHeading = ({ children }) => {
  return <h2 className="text-2xl">{children}</h2>;
};

const SubSubHeading = ({ children }) => {
  return <h5 className="font-semibold">{children}</h5>;
};
const TooltipInfo = ({ id, content }) => {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        className="text-black-50 hover:text-black-80 px-1"
        icon={faInfoCircle}
        data-tooltip-id={id}
      />
      <Tooltip id={id} place="top" effect="solid">
        <div className="max-w-lg">{content}</div>
      </Tooltip>
    </div>
  );
};

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
      <div className="flex">
        <SubSubHeading>Graph Title</SubSubHeading>
        <TooltipInfo
          id="graph-title"
          content={
            "The title of the graph. This will be displayed at the top of the graph."
          }
        />
      </div>
      <input
        className="border-solid border-2 border-black-40 p-2 mr-2 rounded"
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </div>
  );
};

const YTitleEditor = ({ yTitle, updateYTitle, graphItId }) => {
  const [titleState, setTitle] = useState(yTitle);
  async function updateYTitleFirestore(title) {
    const graphRef = doc(collection(db, "graphit"), graphItId);
    await setDoc(
      graphRef,
      {
        yTitle: title,
      },
      { merge: true }
    );
  }
  return (
    <div>
      <div className="flex">
        <SubSubHeading>Y Axis Title</SubSubHeading>
        <TooltipInfo
          id="y-title"
          content={
            "The title of the Y axis. This will be displayed on the left side of the chart next to the Y axis of the graph."
          }
        />
      </div>
      <input
        className="border-solid border-2 border-black-40 p-2 mr-2 rounded"
        type="text"
        value={titleState}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        onClick={() => {
          updateYTitle(titleState);
          updateYTitleFirestore(titleState);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </div>
  );
};

const XTitleEditor = ({ xTitle, updateXTitle, graphItId }) => {
  const [titleState, setTitle] = useState(xTitle);
  async function updateXTitleFirestore(title) {
    const graphRef = doc(collection(db, "graphit"), graphItId);
    await setDoc(
      graphRef,
      {
        xTitle: title,
      },
      { merge: true }
    );
  }
  return (
    <div>
      <div className="flex">
        <SubSubHeading>X Axis Title</SubSubHeading>
        <TooltipInfo
          id="x-title"
          content={
            "The title of the X axis. This will be displayed on the bottom of the chart beneath the X axis of the graph."
          }
        />
      </div>
      <input
        className="border-solid border-2 border-black-40 p-2 mr-2 rounded"
        type="text"
        value={titleState}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        onClick={() => {
          updateXTitle(titleState);
          updateXTitleFirestore(titleState);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      <div className="flex">
        <SubSubHeading>Y Range</SubSubHeading>
        <TooltipInfo
          id="y-range"
          content={
            "The range of the Y axis. Enter the minimum (left) and maximum (right) values for the Y axis."
          }
        />
      </div>
      <input
        type="number"
        className="border-solid border-2 border-black-40 p-2 mr-2 rounded"
        value={yRangeState.min}
        onChange={(e) => {
          setYRange({ ...yRangeState, min: Math.floor(e.target.value) });
        }}
      />
      <input
        type="number"
        className="border-solid border-2 border-black-40 p-2 mr-2 rounded"
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    }, 500); // Reset after the same duration as your transition
  };
  return (
    <div className="font-sans">
      <table className="border-separate border-spacing-y-1">
        <thead>
          <tr className="text-left">
            <th>
              <div className="flex">
                X Datapoint Labels
                <TooltipInfo
                  id="x-label"
                  content={
                    "The label for the datapoints to be plotted on the X axis."
                  }
                />
              </div>
            </th>
            <th>
              <div className="flex">
                Value
                <TooltipInfo
                  id="value"
                  content={
                    "The value for the datapoints to be plotted on the Y axis. These values do not reflect on the graph shared with the users."
                  }
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                className={`${
                  index === movingRowIndex ? "bg-yellow-400" : "bg-black-20"
                } p-2 rounded`}
              >
                <td className="p-1">
                  <input
                    className="border-solid border-2 border-black-40 p-1 mr-1 rounded"
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
                    className="border-solid border-2 border-black-40 p-1 mr-1 rounded"
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
                className="border-solid border-2 border-black-40 p-1 mr-1 rounded"
                value={newDataPoint.label}
                onChange={(e) => {
                  setNewDataPoint({ ...newDataPoint, label: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                className="border-solid border-2 border-black-40 p-1 mr-1 rounded"
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </div>
  );
};

const ShareChart = ({ graphItId }) => {
  return (
    <div className="border-solid border-2 border-sky-500 p-2 rounded bg-slate-300">
      <h2 className="text-2xl">Share Chart</h2>
      <div>
        <h6 className="font-bold">
          <div className="flex">
            User Link
            <TooltipInfo
              id="user-link"
              content={
                "The link to the graph that you can share with users. This link will display the graph without the ability to edit the graph."
              }
            />
          </div>
        </h6>
        <p className="p-2 bg-slate-100 border-solid border-2 border-slate-400 rounded">
          {`${window.location.origin}/general/graphit/${graphItId}`}{" "}
        </p>
      </div>
      <div>
        <h6 className="font-bold">
          <div className="flex">
            Admin Link
            <TooltipInfo
              id="admin-link"
              content="Save this link to edit the graph later. This link will allow you to edit the graph."
            />
          </div>
        </h6>
        <p className="p-2 bg-slate-100 border-solid border-2 border-slate-400 rounded">{`${window.location.origin}/general/graphit/admin/${graphItId}`}</p>
      </div>
      <div></div>
    </div>
  );
};
