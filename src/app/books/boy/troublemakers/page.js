"use client";

import { useEffect, useState } from "react";
// import characterTypeData from "./data/characterdata.json";
// import conflictSituations from "./data/conflictsituations.json";
import ConflictBarChart from "./components/ConflictChart";
import chroma from "chroma-js";

const conflictSituations = [
  {
    id: "0001",
    situation:
      "When my father was fourteen, which is still more than one hundred years ago, he was up on the roof of the family house replacing some loose tiles when he slipped and fell. He broke his left arm below the elbow. Somebody ran to fetch the doctor, and half an hour later this gentleman made a majestic and drunken arrival in his horse-drawn buggy. He was so drunk that he mistook the fractured elbow for a dislocated shoulder.",
  },
  {
    id: "0002",
    situation:
      "Thwaites handed me the mouse. I put it into my trouser pocket. Then the five of us left the school, crossed the village green and headed for the sweet-shop. We were tremendously jazzed up. We felt like a gang of desperados setting out to rob a train or blow up the sheriff’s office.",
  },
  {
    id: "0003",
    situation:
      "Mr Coombes’s performance the second time was the same as the first. So was Mrs Pratchett’s. She kept up her screeching all the way through, exhorting Mr Coombes to greater and still greater efforts, and the awful thing was that he seemed to be responding to her cries. He was like an athlete who is spurred on by the shouts of the crowd in the stands. Whether this was true or not, I was sure of one thing. He wasn’t weakening.",
  },
  {
    id: "0004",
    situation:
      "I was too shocked and outraged to do anything but yelp. I was horrified by the huge red lumps that had fallen out of my mouth into the white basin and my first thought was that the doctor had cut out the whole of the middle of my head.",
  },
  {
    id: "0005",
    situation:
      "Mind you, the Headmaster was a clever fellow. He did not want our parents to think that those letters of ours were censored in this way, and therefore he never allowed us to correct a spelling mistake in the letter itself. If, for example, I had written… last Tuesday knight we had a lecture…, he would say:",
  },
  {
    id: "0006",
    situation:
      "In slow motion and with immense reluctance, little Perkins, aged eight and a half, would get into his dressing-gown and slippers and disappear down the long corridor that led to the back stairs and the Headmaster’s private quarters. And the Matron, as we all knew, would follow after him and stand at the top of the stairs listening with a funny look on her face for the crack… crack… crack of the cane that would soon be coming up from below. To me that noise always sounded as though the Headmaster was firing a pistol at the ceiling of his study.",
  },
  {
    id: "0007",
    situation:
      "On one occasion during my first term, I went down to the Matron’s room to have some iodine put on a grazed knee and I didn’t know you had to knock before you entered. I opened the door and walked right in, and there she was in the centre of the Sick Room floor locked in some kind of an embrace with the Latin master, Mr Victor Corrado. They flew apart as I entered and both their faces went suddenly crimson. ‘How dare you come in without knocking!’ the Matron shouted. ‘Here I am trying to get something out of Mr Corrado’s eye and in you burst and disturb the whole delicate operation!’",
  },
  {
    id: "0008",
    situation:
      "Once, after lights out, a brave boy called Wragg tiptoed out of our dormitory and sprinkled castor sugar all over the linoleum floor of the corridor. When Wragg returned and told us that the corridor had been successfully sugared from one end to the other, I began shivering with excitement. I lay there in the dark in my bed waiting and waiting for the Matron to go on the prowl. Nothing happened. Perhaps, I told myself, she is in her room taking another speck of dust out of Mr Victor Corrado’s eye.",
  },
  {
    id: "0009",
    situation:
      "Soon the Headmaster was summoned from below. The Matron, with steam coming out of her nostrils, cried out to him for help, and now the whole school was herded into the long corridor, where we stood freezing in our pyjamas and bare feet while the culprit or culprits were ordered to step forward.",
  },
  {
    id: "0010",
    situation:
      "There was a boy in our dormitory during my first term called Tweedie, who one night started snoring soon after he had gone to sleep. ‘Who’s that talking?’ cried the Matron, bursting in. My own bed was close to the door, and I remember looking up at her from my pillow and seeing her standing there silhouetted against the light from the corridor and thinking how truly frightening she looked. I think it was her enormous bosom that scared me most of all. My eyes were riveted to it, and to me it was like a battering-ram or the bows of an icebreaker or maybe a couple of high-explosive bombs.",
  },
  {
    id: "0011",
    situation:
      "I lay on the bed and she began prodding my tummy violently with her fingers. I was watching her carefully, and when she hit what I guessed was the appendix place, I let out a yelp that rattled the window-panes. ‘Ow! Ow! Ow!’ I cried out. ‘Don’t, Matron, don’t!’ Then I slipped in the clincher. ‘I’ve been sick all morning,’ I moaned, ‘and now there’s nothing left to be sick with, but I still feel sick!’",
  },
  {
    id: "0012",
    situation:
      "Spurred on by our shouts and taunts, the ancient sister began to increase the speed. The engine roared and the body vibrated. The driver was clutching the steering-wheel as though it were the hair of a drowning man, and we all watched the speedometer needle creeping up to twenty, then twenty-five, then thirty. We were probably doing about thirty-five miles an hour when we came suddenly to a sharpish bend in the road. The ancient sister, never having been faced with a situation like this before, shouted ‘Help!’ and slammed on the brakes and swung the wheel wildly round. The rear wheels locked and went into a fierce sideways skid, and then, with a marvellous crunch of mudguards and metal, we went crashing into the hedge. The front passengers all shot through the front windscreen and the back passengers all shot through the back windscreen. Glass (there was no Triplex then) flew in all directions and so did we. My brother and one sister landed on the bonnet of the car, someone else was catapulted out on to the road and at least one small sister landed in the middle of the hawthorn hedge. But miraculously nobody was hurt very much except me. My nose had been cut almost clean off my face as I went through the rear windscreen and now it was hanging on only by a single small thread of skin. My mother disentangled herself from the scrimmage and grabbed a handkerchief from her purse. She clapped the dangling nose back into place fast and held it there.",
  },
  {
    id: "0013",
    situation:
      "The crunch came during my second term when I was exactly nine and a half, and it happened during evening Prep. Every weekday evening, the whole school would sit for one hour in the Main Hall, between six and seven o’clock, to do Prep. The master on duty for the week would be in charge of Prep, which meant that he sat high up on a dais at the top end of the Hall and kept order. Some masters read a book while taking Prep and some corrected exercises, but not Captain Hardcastle. He would sit up there on the dais twitching and grunting and never once would he look down at his desk. His small milky-blue eyes would rove the Hall for the full sixty minutes, searching for trouble, and heaven help the boy who caused it.",
  },
  {
    id: "0014",
    situation:
      "Disaster struck when I foolishly stubbed the tip of my nib into the top of the desk. The nib broke. I knew I hadn’t got a spare one in my pocket, but a broken nib was never accepted as an excuse for not finishing Prep. We had been set an essay to write and the subject was ‘The Life Story of a Penny’ (I still have that essay in my files). I had made a decent start and I was rattling along fine when I broke that nib. There was still another half-hour of Prep to go and I couldn’t sit there doing nothing all that time. Nor could I put up my hand and tell Captain Hardcastle I had broken my nib. I simply did not dare. And as a matter of fact, I really wanted to finish that essay. I knew exactly what was going to happen to my penny through the next two pages and I couldn’t bear to leave it unsaid.",
  },
  {
    id: "0015",
    situation:
      "The following morning, as soon as prayers were over, the Headmaster called for Quarter-Stars and Stripes. I was the only boy to go up. The assistant masters were sitting on very upright chairs on either side of the Headmaster, and I caught a glimpse of Captain Hardcastle, arms folded across his chest, head twitching, the milky-blue eyes watching me intently, the look of triumph still glimmering on his face. I handed in my Stripe. The Headmaster took it and read the writing. ‘Come and see me in my study’, he said, ‘as soon as this is over.’",
  },
  {
    id: "0016",
    situation:
      "Ellis screamed. He never saw the scalpel going in and he never saw it coming out, but he felt it all right and he screamed like a stuck pig. I can see him now struggling to get the towel off his head, and when he emerged the tears were streaming down his cheeks and his huge brown eyes were staring at the doctor with a look of utter and total outrage.",
  },
];
const characterTypeData = [
  { character: "Boy", charType: "Children" },
  { character: "Thwaites", charType: "Children" },
  { character: "Mom", charType: "Adult" },
  { character: "Dad", charType: "Adult" },
  { character: "Mr. Coombes", charType: "Adult" },
  { character: "Mrs. Pratchett", charType: "Adult" },
  { character: "Wragg", charType: "Children" },
  { character: "Tweedie", charType: "Children" },
  { character: "Matron", charType: "Adult" },
  { character: "Victor Corrado", charType: "Adult" },
  { character: "Headmaster", charType: "Adult" },
  { character: "Perkins", charType: "Children" },
  { character: "Ellis", charType: "Children" },
  { character: "Doctor", charType: "Adult" },
  { character: "Sister", charType: "Adult" },
  { character: "Captain Hardcastle", charType: "Adult" },
];

function addAgentField(conflicts) {
  return conflicts.map((item) => ({
    ...item,
    agent: null,
  }));
}

function addConflictsField(characterTypeData) {
  // assigning a scale of colors using chroma-js for both charTypes
  const childrenScale = chroma.scale(["lightblue", "blue"]);
  const adultScale = chroma.scale(["lightcoral", "red"]);

  // determining the steps between colors for each charType
  const childrenStep =
    1 / characterTypeData.filter((item) => item.charType === "Children").length;
  const adultStep =
    1 / characterTypeData.filter((item) => item.charType === "Adult").length;

  let childrenCount = 0,
    adultCount = 0;

  return characterTypeData.map((item) => {
    const color =
      item.charType === "Children"
        ? childrenScale((childrenCount += childrenStep)).hex()
        : adultScale((adultCount += adultStep)).hex();
    return {
      ...item,
      conflicts: 0,
      color: color,
    };
  });
}

function assignAgentToConflict(conflictSituations, id, agentName) {
  return conflictSituations.map((conflict) =>
    conflict.id === id ? { ...conflict, agent: agentName } : conflict
  );
}

export default function Home() {
  const [conflictData, setConflictData] = useState();
  const [characterData, setCharacterData] = useState();

  function updateCharWithConflicts() {
    if (characterData === undefined || characterData === null) return;
    let newArray = characterData.map((character) => {
      const conflictCount = conflictData.reduce((count, conflict) => {
        return conflict.agent === character.character ? count + 1 : count;
      }, 0);
      return { ...character, conflicts: conflictCount };
    });
    setCharacterData(newArray);
  }

  useEffect(() => {
    setConflictData(addAgentField(conflictSituations));
    setCharacterData(addConflictsField(characterTypeData));
  }, []);

  useEffect(() => {
    updateCharWithConflicts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conflictData]);

  return (
    <main>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="w-1/2 bg-stone-200 px-12 py-12">
          <div className="py-4">
            <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
              Boy
            </span>
            <h1 className="text-xl pb-2">
              Who do you think is most responsible for all the trouble in this
              book?
            </h1>
          </div>
          <div className="overflow-auto h-[70vh]">
            <table className="w-full table-auto">
              <thead className="border-b-2 sticky top-0 border-gray-300">
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border-r border-b-2 border-gray-300">
                    Scene
                  </th>
                  <th className="text-left p-2 border-b-2 border-gray-300">
                    In each scene below, decide who you think is most
                    responsible.
                  </th>
                </tr>
              </thead>
              <tbody>
                {conflictSituations.map(({ id, situation }) => (
                  <tr className="border-b border-gray-300 bg-gray-100" key={id}>
                    <td className="w-3/4 p-2 border-l border-r border-gray-300 font-serif">
                      &quot;
                      {situation}
                      &quot;
                    </td>
                    <td className="p-2 border-r border-gray-300">
                      <select
                        onChange={(event) => {
                          setConflictData(
                            assignAgentToConflict(
                              conflictData,
                              id,
                              event.target.value
                            )
                          );
                          event.target.parentNode.parentNode.classList.toggle(
                            "bg-green-100/80",
                            event.target.value !== ""
                          );
                        }}
                      >
                        <option value="">Select a character</option>
                        {characterTypeData.map((charData, index) => (
                          <option key={index} value={charData.character}>
                            {charData.character}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/2 bg-slate-100 overflow-auto px-24 py-24">
          <div className="py-4">
            <h1 className="text-2xl">This chart reflects your responses</h1>
          </div>

          <ConflictBarChart data={characterData} />
        </div>
      </div>
    </main>
  );
}
