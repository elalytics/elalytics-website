"use client";
import Link from "next/link";
import {
  faStar,
  faCloud,
  faLineChart,
  faChartColumn,
  faTableCells,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "@/app/allVisualizationDetails.json";
import { useState, useEffect, useMemo } from "react";

const VizItem = ({ item }) => {
  const gradeColors = {
    "Grade 6": "#009BCC",
    "Grade 7": "#9747FF",
    "Grade 8": "#CC8700",
  };
  const categoryStyles = {
    "Word Cloud": { backgroundColor: "#CC0000", icon: faCloud },
    "Line Chart": { backgroundColor: "#098433", icon: faLineChart },
    "Bar Chart": { backgroundColor: "#0052CC", icon: faChartColumn },
    Misc: { backgroundColor: "#000000", icon: faTableCells },
  };
  const textCovers = {
    Boy: "/imgs/textCovers/boy.jpg",
    "Summer of the Mariposas": "/imgs/textCovers/summer-of-the-mariposas.jpg",
    "Fish Cheeks": "/imgs/textCovers/fish-cheeks.jpg",
    "The Lottery": "/imgs/textCovers/lottery.jpg",
    "Christmas Carol": "/imgs/textCovers/christmas-carol.jpg",
    "The Lady, or the Tiger?": "/imgs/textCovers/lady-tiger.jpg",
    "Smart Ice Cream": "/imgs/textCovers/smart-ice-cream.jpg",
    "The Elevator": "/imgs/textCovers/the-elevator.jpg",
    "The Scholarship Jacket": "/imgs/textCovers/the-scholarship-jacket.jpg",
    "The Wife's Story": "/imgs/textCovers/the-wifes-story.jpg",
    Prometheus: "/imgs/textCovers/prometheus.jpg",
    Chocolate: "/imgs/textCovers/chocolate.jpg",
    "Demystifying Brain": "/imgs/textCovers/demystifying-brain.png",
    "Phineas Gage": "/imgs/textCovers/phineas-gage.jpeg",
    "Annabel Lee": "/imgs/textCovers/annabel-lee.jpg",
    "The Raven": "/imgs/textCovers/the-raven.jpg",
    "Cask of Amontillado": "/imgs/textCovers/amontillado.jpg",
    "Murders of Rue Morgue": "/imgs/textCovers/rue-morgue.jpg",
    "The Tell-Tale Heart": "/imgs/textCovers/tell-tale.jpeg",
    "Maroo of Winter Caves": "/imgs/textCovers/maroo.jpg",
    "Going Solo": "/imgs/textCovers/solo.jpg",
    "To Kill a Mockingbird": "/imgs/textCovers/mockingbird.jpg",
    "Red Scarf": "/imgs/textCovers/red_scarf.jpg",
    "Lightning Thief": "/imgs/textCovers/lightning_thief.jpg",
    "A Midsummer Night's Dream": "/imgs/textCovers/midsummer_night.jpg",
    "Voyage Out": "/imgs/textCovers/voyage.jpg",
    "Of Mice and Men": "/imgs/textCovers/mice.jpg",
    "Bless Me, Ultima": "/imgs/textCovers/ultima.jpg",
    "Frankenstein": "/imgs/textCovers/franc.jpg",
    "American Childhood": "/imgs/textCovers/childhood.jpg",
    "Titanic": "/imgs/textCovers/titanic.jpg",
    "Soledad": "/imgs/textCovers/Soledad.jpg",
    "Mike": "/imgs/textCovers/Mike.jpg",
    "Narrative of the Life of Frederick Douglass, an American Slave": "/imgs/textCovers/douglass.jpg",
    "Refugee": "/imgs/textCovers/refugee.jpg",
    "Detroit Industry: The Murals of Diego Rivera": "/imgs/textCovers/frida.png",
    "Frida Becomes My Wife": "/imgs/textCovers/frida.png",
    "Letter to Ella and Bertram Wolfe": "/imgs/textCovers/frida.png",
    "Life With Frida": "/imgs/textCovers/frida.png",
    "The Great Rat Hunt": "/imgs/textCovers/rat_hunt.png",
    "Rockefellers Ban Lenin in RCA Mural and Dismiss Rivera": "/imgs/textCovers/frida.png",
    "Rules of the Game": "/imgs/textCovers/rules.png",
    "Excerpt from Smithsonian: Frida Kahlo": "/imgs/textCovers/frida.png",
    "Statement by Frida Kahlo": "/imgs/textCovers/frida.png"
  };
  return (
    <div className="bg-white w-[300px] rounded shadow hover:shadow-xl h-full flex flex-col justify-between">
      <div>
        <div
          className="rounded-t p-2"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
              textCovers[item.textName]
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "180px",
          }}
        >
          <div className="flex gap-1 mb-2">
            <span
              className="p-1 px-3 text-white font-bold rounded text-xs"
              style={{ backgroundColor: gradeColors[item.grade] }}
            >
              {item.grade}
            </span>
            <span
              className="p-1 px-3 text-white font-bold rounded text-xs"
              style={{
                backgroundColor:
                  categoryStyles[item.category]?.backgroundColor ??
                  categoryStyles["Misc"]?.backgroundColor,
              }}
              title={item.category || "Misc"}
            >
              <i title={item.category || "Misc"}>
                <FontAwesomeIcon
                  icon={
                    categoryStyles[item.category]?.icon ??
                    categoryStyles["Misc"]?.icon
                  }
                />
              </i>
            </span>
          </div>
        </div>
        <div className="mb-1 pt-2 px-2">
          <p
            className="text-xl"
            title={`Visualization Name: ${item.title}`}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
          </p>
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm font-bold" title={`Text Name: ${item.textName}`}>
          {item.textName}
        </p>
        <span className="text-sm text-black-70">Interactive</span>
        <span className="ml-1">
          {item.interactivity ? (
            <FontAwesomeIcon icon={faSquareCheck} className="text-green-500" />
          ) : (
            <FontAwesomeIcon icon={faSquare} className="text-black-50" />
          )}
        </span>
      </div>
    </div>
  );
};

export default function Visualizations() {
  const dataAsArray = useMemo(() => Object.values(data), [data]);
  const [vizData, setVizData] = useState(dataAsArray);
  const handleFilter = (filteredData) => {
    setVizData(filteredData);
  };
  return (
    <main className="h-[calc(100vh-105px)]">
      <div className="flex h-full">
        <div className="p-5 bg-slate-50 w-[400px] flex-shrink-0">
          <h1 className="text-4xl font-bold text-cardinal-red mb-2">
            Elalytics
          </h1>
          <FilterComponent vizData={dataAsArray} onFilter={handleFilter} />
        </div>
        <div className="p-5 overflow-y-scroll w-[calc(100%-400px)]">
          <div className="flex flex-wrap gap-3 items-stretch ">
            {vizData.map((item, index) => {
              return (
                <Link key={index} href={item.link}>
                  <VizItem item={item} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

function FilterComponent({ vizData, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [grades, setGrades] = useState([]);
  const [categories, setCategories] = useState([]);
  const [textNames, setTextNames] = useState([]);

  useEffect(() => {
    const uniqueGrades = [...new Set(vizData.map((item) => item.grade))];
    setGrades(uniqueGrades.map((grade) => ({ label: grade, checked: true })));

    const uniqueCategories = [
      ...new Set(vizData.map((item) => item.category || "Misc")),
    ];
    setCategories(
      uniqueCategories.map((category) => ({ label: category, checked: true }))
    );

    const uniqueTextNames = [...new Set(vizData.map((item) => item.textName))];
    setTextNames(
      uniqueTextNames.map((textName) => ({ label: textName, checked: true }))
    );
  }, [vizData]);

  const handleFilter = () => {
    const selectedGrades = grades
      .filter((grade) => grade.checked)
      .map((grade) => grade.label);
    const selectedCategories = categories
      .filter((category) => category.checked)
      .map((category) => category.label);
    const selectedTextNames = textNames
      .filter((textName) => textName.checked)
      .map((textName) => textName.label);

    const filteredData = vizData.filter(
      (item) =>
        selectedGrades.includes(item.grade) &&
        selectedCategories.includes(item.category) &&
        selectedTextNames.includes(item.textName) &&
        (searchTerm
          ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.textName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.category &&
              item.category.toLowerCase().includes(searchTerm.toLowerCase()))
          : true)
    );
    onFilter(filteredData);
  };

  useEffect(() => {
    handleFilter();
  }, [grades, categories, textNames, searchTerm]);

  const unselectAllTextNames = () => {
    setTextNames(textNames.map((textName) => ({ ...textName, checked: false })));
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full p-2 mb-3 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cardinal-red focus:border-transparent"
      />
      <div className="mb-3">
        <h3 className="text-xl font-bold">Grade</h3>
        <div className="flex gap-2">
          {grades.map((grade, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={grade.checked}
                onChange={() => {
                  setGrades(
                    grades.map((g, i) =>
                      i === index ? { ...g, checked: !g.checked } : g
                    )
                  );
                }}
              />
              {grade.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <h3 className="text-xl font-bold">Visualization Category</h3>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={category.checked}
                onChange={() => {
                  setCategories(
                    categories.map((c, i) =>
                      i === index ? { ...c, checked: !c.checked } : c
                    )
                  );
                }}
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>
              <button
          onClick={unselectAllTextNames}
          className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Unselect All Texts
        </button>
      <div className="mb-3">
        <h3 className="text-xl font-bold">Text Name</h3>
        <div className="flex flex-col max-h-[300px] overflow-y-scroll p-2 bg-white rounded">
          {textNames.map((textName, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={textName.checked}
                onChange={() => {
                  setTextNames(
                    textNames.map((t, i) =>
                      i === index ? { ...t, checked: !t.checked } : t
                    )
                  );
                }}
              />
              {textName.label}
            </label>
          ))}
        </div>

      </div>
    </div>
  );
}

