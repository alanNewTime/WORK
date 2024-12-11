import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"; // Make sure THREE is imported for the DoubleSide constant
import { useRef, useState } from "react";

function Pillars({ totalWidth }) {
  // The first pillar stays at the extreme left of the window bundle
  const firstPillarPosition = [-(totalWidth / 2) - 1.95, 1, 1]; // Shift slightly left from the window collection
  // The second pillar stays at the extreme right of the window bundle
  const secondPillarPosition = [totalWidth / 2 + 1.95, 1, 1]; // Shift slightly right from the window collection

  return (
    <>
      {/* left pillar */}
      <group position={firstPillarPosition}>
        <mesh>
          <boxGeometry attach="geometry" args={[1, 8, 1.2 + totalWidth / 7]} />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>
        <mesh>
          <boxGeometry attach="geometry" args={[1, 8, 1.2 + totalWidth / 7]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>

      {/* right pillar */}
      <group>
        <mesh position={secondPillarPosition}>
          <boxGeometry attach="geometry" args={[1, 8, 1.2 + totalWidth / 7]} />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>
        <mesh position={secondPillarPosition}>
          <boxGeometry attach="geometry" args={[1, 8, 1.2 + totalWidth / 7]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

function Rails({ totalWidth }) {
  return (
    <>
      {/* top rails */}
      <group>
        <mesh
          position={[0, 3.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry
            attach="geometry"
            args={[totalWidth / 4, totalWidth + 3, 0.5]}
          />
          <meshStandardMaterial attach="material" color="whitesmoke" />
        </mesh>
        <mesh
          position={[0, 3.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry
            attach="geometry"
            args={[totalWidth / 4, totalWidth + 3, 0.5]}
          />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>

      {/* bottom rails */}
      <group>
        <mesh
          position={[0, -1.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry
            attach="geometry"
            args={[totalWidth / 4, totalWidth + 3, 0.5]}
          />
          <meshStandardMaterial attach="material" color="whitesmoke" />
        </mesh>
        <mesh
          position={[0, -1.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry
            attach="geometry"
            args={[totalWidth / 4, totalWidth + 3, 0.5]}
          />
          <meshStandardMaterial
            attach="material"
            color="white"
            wireframe={true}
          />
        </mesh>
      </group>
    </>
  );
}

function Window({ position, glassColorProp }) {
  const mesh = useRef(null);

  return (
    <>
      {/* glass */}
      <group>
        <mesh position={position} castShadow ref={mesh}>
          <boxGeometry attach="geometry" args={[2.85, 4.5, 0.5]} />
          <meshStandardMaterial attach="material" color={glassColorProp} />
        </mesh>
        <mesh position={position} castShadow ref={mesh}>
          <boxGeometry attach="geometry" args={[2.85, 4.5, 0.5]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>

      {/* sash */}
      <group>
        <mesh position={position} castShadow ref={mesh}>
          <boxGeometry attach="geometry" args={[3, 5, 0.25]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>
        <mesh position={position} castShadow ref={mesh}>
          <boxGeometry attach="geometry" args={[3, 5, 0.25]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

function PlaneElement() {
  return (
    <mesh receiveShadow position={[0, -10, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[30, 30]} />
      <meshStandardMaterial
        attach="material"
        color="lightblue"
        side={THREE.DoubleSide} // This makes sure that the plane is full from both sides and not just one
      />
    </mesh>
  );
}

function SlidingGlassWindows(props) {
  //handles the style inside the component
  const controlsStyle = {
    fontFamily: "sans-serif",
    position: "absolute",
    top: "20px",

    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",

    backgroundColor: "gray",
  };

  const orientation = {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const canvasClutter = {
    display: "block",
    width: "100vw",
    height: "100vh",
  };

  // Calculate the total width of the windows (spacing * (number of windows - 1))
  const windowSpacing = 3; // Space between windows
  const totalWidth = (props.windowNumber - 1) * windowSpacing; // Space between windows multiplied by (windows count - 1)

  //manage and trace the values of windows orientations from select
  const [orientationInput, setOrientationInput] = useState("");

  const handleOrientationChange = (e) => {
    setOrientationInput(e.target.value);
  };

  //BRAIN BEHIND OPENING AND CLOSING MECHANISM OF THE WINDOWS LINKED TO THE ORIENTATION START----------------------------
  // Generate the initial positions for each window dynamically based on windowNumber. In
  // In this case the windows are initially closed
  let windowInitialPositions = Array.from(
    { length: props.windowNumber },
    (_, index) => [
      index * windowSpacing - totalWidth / 2, // Shift windows to the left so that the center is aligned
      1, // Same Y position
      1, // shift windows inward as i add them
    ]
  );

  //set the initial window positions based on the orientation i choose
  if (orientationInput == "rx-lx") {
    windowInitialPositions = Array.from(
      { length: props.windowNumber },
      (_, index) => [
        index * windowSpacing - totalWidth / 2, // Shift windows to the left so that the center is aligned
        1, // Same Y position
        1 + index * 0.1, // shift windows inward as i add them
      ]
    );
  } else if (orientationInput == "lx-rx") {
    windowInitialPositions = Array.from(
      { length: props.windowNumber },
      (_, index) => [
        index * windowSpacing - totalWidth / 2, // Shift windows to the left so that the center is aligned
        1, // Same Y position
        1 - index * 0.1, // shift windows inward as i add them
      ]
    );
  }

  //manage and trace the values of windows positions
  const [windowsPositions, setWindowsPositions] = useState(
    windowInitialPositions
  );

  // set how the windows open based on the orientation i choose
  const openWindows = () => {
    //i needed the two consts to hel me manage better the "rx-lx" opening logic
    const windowSpacing = 3; // Space between windows
    const totalWidth = (props.windowNumber - 1) * windowSpacing; // Space between windows multiplied by (windows count - 1)

    if (orientationInput == "rx-lx") {
      //set the positions of the windows based on the number of windows for the "rx-lx" START---------------------------
      if (props.windowNumber >= 3) {
        // Generate the positions for each window dynamically based on windowNumber
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            -totalWidth / 2.05 + index * 1.5, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            totalWidth / 40 + index * 0.25, // Z position
          ])
        );
      } else if (props.windowNumber < 3 && props.windowNumber > 1) {
        // Generate the positions for each window dynamically based on windowNumber
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            -totalWidth / 2.05 + index * 1.5, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            totalWidth / 4 + index * 0.25, // Z position
          ])
        );
      } else if (props.windowNumber == 1) {
        // Generate the positions for each window dynamically based on windowNumber
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            -totalWidth / 2.05 + index * 1.5, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            -totalWidth + 1, // Z position
          ])
        );
      }
      //set the positions of the windows based on the number of windows for the "rx-lx" END---------------------------
    } else if (orientationInput == "lx-rx") {
      // Generate the positions for each window dynamically based on windowNumber
      setWindowsPositions(
        Array.from({ length: props.windowNumber }, (_, index) => [
          -0.1 + index * 1.5, // Shift windows to the left so that the center is aligned
          1, // Same Y position
          1.2 + index * -0.25, // Same Z position
        ])
      );
    } else if (orientationInput == "") {
      //CLOSE WINDOWS if you do not select an orientation
      setWindowsPositions(windowInitialPositions);
    }
  };

  //set how the window closes based on the orientation i choose
  const closeWindows = () => {
    // Generate the positions for each window dynamically based on windowNumber
    setWindowsPositions(windowInitialPositions);
  };
  //BRAIN BEHIND OPENING AND CLOSING MECHANISM OF THE WINDOWS LINKED TO THE ORIENTATION END------------------------------

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [-5, 2, 30], fov: 60 }}
        style={canvasClutter}
      >
        <ambientLight intensity={0.3} />

        <directionalLight
          castShadow
          position={[1, 10, 0]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Render the pillars */}
        <Pillars totalWidth={totalWidth} />

        <Rails totalWidth={totalWidth} />

        {/* Map over windowPositions array to render multiple windows */}
        {windowsPositions.map((position, index) => (
          <Window
            key={index}
            position={position}
            glassColorProp={props.glassColor}
          />
        ))}

        <shadowMaterial attach="material" opacity={0.5} />
        <PlaneElement />
        <OrbitControls />
      </Canvas>

      {/* control panel */}
      <div style={controlsStyle}>
        <div style={orientation}>
          <label style={{ color: "white" }} htmlFor="direction">
            Orientamento finestre:{" "}
          </label>
          <select
            name="direction"
            id="direction"
            value={orientationInput}
            onChange={handleOrientationChange}
          >
            <option value="">Seleziona orientamento</option>
            <option value="rx-lx">Apertura da destra a sinistra</option>
            <option value="lx-rx">Apertura da sinistra a destra</option>
          </select>
        </div>

        <p style={{ color: "white" }}>Apertura e Chiusura Finestre: </p>
        <div>
          <button onClick={openWindows}>Apri Finestra</button>
          <button onClick={closeWindows}>Chiudi Finestra</button>
        </div>
      </div>
    </>
  );
}

export default SlidingGlassWindows;
