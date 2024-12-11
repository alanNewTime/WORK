import "./App.css";
import SlidingGlassWindows from "./components/SlidingGlassWindows";
import FoldableGlassWindows from "./components/FoldableGlassWindows";
import FoldableGlassPanel from "./components/FoldableGlassPanel";

function App() {
  const caratteristiche = {
    numeroDiFinestre: 6,
    colorVetro: "lightBlue",
  };

  return (
    <>
      {/* <FoldableGlassWindows
        windowNumber={caratteristiche.numeroDiFinestre}
        glassColor={caratteristiche.colorVetro}
      /> */}
      {/* <SlidingGlassWindows
        windowNumber={caratteristiche.numeroDiFinestre}
        glassColor={caratteristiche.colorVetro}
      /> */}
      <FoldableGlassPanel
        windowNumber={caratteristiche.numeroDiFinestre}
        glassColor={caratteristiche.colorVetro}
      />
    </>
  );
}

export default App;
