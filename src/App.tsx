import { useState } from "react";
import "./App.css";

type Score = 0 | 1 | 2 | 3;

type CriterionLevel = {
  score: Score;
  label: string;
  description: string;
};

type Criterion = {
  id: string;
  title: string;
  weight: number;
  levels: CriterionLevel[];
};

const criteria: Criterion[] = [
  {
    id: "api",
    title: "API un dati",
    weight: 20,
    levels: [
      {
        score: 0,
        label: "Nepietiekami",
        description: "API nedarbojas vai dati netiek attēloti.",
      },
      {
        score: 1,
        label: "Vidēji",
        description:
          "Dati tiek ielādēti, bet trūkst ielādes vai kļūdu apstrādes.",
      },
      {
        score: 2,
        label: "Labi",
        description:
          "API integrācija ir stabila, dati tiek korekti attēloti.",
      },
      {
        score: 3,
        label: "Teicami",
        description:
          "Pilnīga integrācija, izmantotas vairākas metodes, perfekta kļūdu apstrāde.",
      },
    ],
  },
  {
    id: "state",
    title: "React State",
    weight: 15,
    levels: [
      {
        score: 0,
        label: "Nepietiekami",
        description: "Hooki netiek izmantoti vai tiek izmantoti kļūdaini.",
      },
      {
        score: 1,
        label: "Vidēji",
        description:
          "Stāvoklis tiek pārvaldīts, bet komponentes ir pārāk smagas vai haotiskas.",
      },
      {
        score: 2,
        label: "Labi",
        description:
          "Pareiza useState un useEffect izmantošana un datu plūsma.",
      },
      {
        score: 3,
        label: "Teicami",
        description:
          "Efektīva un optimizēta stāvokļa pārvaldība visā lietotnē.",
      },
    ],
  },
  {
    id: "structure",
    title: "Struktūra un TS",
    weight: 10,
    levels: [
      {
        score: 0,
        label: "Nepietiekami",
        description:
          "Kods nav strukturēts, TypeScript nav izmantots vai viss ir any.",
      },
      {
        score: 1,
        label: "Vidēji",
        description: "Ir mēģināts strukturēt, TypeScript izmantots daļēji.",
      },
      {
        score: 2,
        label: "Labi",
        description: 'Ievērota "Feature" struktūra, definēti galvenie tipi.',
      },
      {
        score: 3,
        label: "Teicami",
        description:
          "Profesionāla struktūra, pilnīga tipizācija bez any izmantošanas.",
      },
    ],
  },
  {
    id: "ui",
    title: "UI/UX",
    weight: 5,
    levels: [
      {
        score: 0,
        label: "Nepietiekami",
        description: "Dizains nav izveidots vai nav lietojams.",
      },
      {
        score: 1,
        label: "Vidēji",
        description: "Izmantots Tailwind, bet dizains nav responsīvs.",
      },
      {
        score: 2,
        label: "Labi",
        description: "Tīrs un funkcionāls dizains visām ierīcēm.",
      },
      {
        score: 3,
        label: "Teicami",
        description: "Estētiski augstvērtīgs un lietotājam draudzīgs UI.",
      },
    ],
  },
  {
    id: "presentation",
    title: "Prezentācija",
    weight: 50,
    levels: [
      {
        score: 0,
        label: "Nepietiekami",
        description: "Nav iesniegta vai nesatur prasīto informāciju.",
      },
      {
        score: 1,
        label: "Vidēji",
        description: "Sniegts īss ieskats, trūkst koda skaidrojuma.",
      },
      {
        score: 2,
        label: "Labi",
        description: "Skaidra prezentācija, parādītas funkcijas un kods.",
      },
      {
        score: 3,
        label: "Teicami",
        description:
          "Skaidra prezentācija, parādītas funkcijas un kods, pats risinājums ir oriģināls un interesants.",
      },
    ],
  },
];

const createScores = (score: Score): Record<string, Score> =>
  criteria.reduce<Record<string, Score>>((accumulator, criterion) => {
    accumulator[criterion.id] = score;
    return accumulator;
  }, {});

const getOverallLabel = (averageScore: number): string => {
  if (averageScore < 1) {
    return "Nepietiekami";
  }

  if (averageScore < 2) {
    return "Vidēji";
  }

  if (averageScore < 2.75) {
    return "Labi";
  }

  return "Teicami";
};

function App() {
  const [scores, setScores] = useState<Record<string, Score>>(createScores(0));

  const weightedPercent = criteria.reduce((total, criterion) => {
    return total + (scores[criterion.id] / 3) * criterion.weight;
  }, 0);

  const weightedAverageScore = criteria.reduce((total, criterion) => {
    return total + scores[criterion.id] * (criterion.weight / 100);
  }, 0);

  const totalRawPoints = criteria.reduce((total, criterion) => {
    return total + scores[criterion.id];
  }, 0);

  const maxRawPoints = criteria.length * 3;
  const overallLabel = getOverallLabel(weightedAverageScore);

  const updateScore = (criterionId: string, score: Score) => {
    setScores((current) => ({
      ...current,
      [criterionId]: score,
    }));
  };

  return (
    <main className="app-shell">
      <section className="header-panel">
        <h1>PROG2 2. projekta vērtējuma kalkulators</h1>
        <p>
          Izvēlies punktus katrai kategorijai no 0 līdz 3. Rezultāts tiek
          aprēķināts automātiski pēc svara.
        </p>
      </section>

      <section className="summary-panel">
        <div className="summary-item">
          <span>Kopējais rezultāts</span>
          <strong>{weightedPercent.toFixed(1)}%</strong>
        </div>
        <div className="summary-item">
          <span>Punkti (svertais vidējais)</span>
          <strong>{weightedAverageScore.toFixed(2)} / 3</strong>
        </div>
        <div className="summary-item">
          <span>Punkti</span>
          <strong>
            {totalRawPoints} / {maxRawPoints}
          </strong>
        </div>
      </section>

      <section className="criteria-list">
        {criteria.map((criterion) => {
          const selectedScore = scores[criterion.id];
          const activeLevel = criterion.levels[selectedScore];

          return (
            <article className="criterion-row" key={criterion.id}>
              <div className="criterion-main">
                <div>
                  <h2>{criterion.title}</h2>
                  <p className="criterion-weight">Svars: {criterion.weight}%</p>
                </div>

                <label className="score-control">
                  <span>Punkti</span>
                  <select
                    value={selectedScore}
                    onChange={(event) =>
                      updateScore(
                        criterion.id,
                        Number(event.target.value) as Score,
                      )
                    }
                  >
                    {criterion.levels.map((level) => (
                      <option key={level.score} value={level.score}>
                        {level.score} - {level.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <p className="criterion-status">
                <strong>{activeLevel.label}:</strong> {activeLevel.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="formula-panel">
        <p>
          Formula: <strong>(punkti / 3) × kategorijas svars</strong>
        </p>
      </section>
    </main>
  );
}

export default App;
