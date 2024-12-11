import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"; // Make sure THREE is imported for the DoubleSide constant
import { useRef, useState } from "react";

function Pillars({ totalWidth }) {
  // The first pillar stays at the extreme left of the window bundle
  const firstPillarPosition = [-(totalWidth / 2) - 2, 1, 1]; // Shift slightly left from the window collection
  // The second pillar stays at the extreme right of the window bundle
  const secondPillarPosition = [totalWidth / 2 + 2, 1, 1]; // Shift slightly right from the window collection

  return (
    <>
      {/* left pillar */}
      <group>
        <mesh position={firstPillarPosition}>
          <boxGeometry attach="geometry" args={[1, 8, 2]} />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>
        <mesh position={firstPillarPosition}>
          <boxGeometry attach="geometry" args={[1, 8, 2]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>

      {/* right pillar */}
      <group>
        <mesh position={secondPillarPosition}>
          <boxGeometry attach="geometry" args={[1, 8, 2]} />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>
        <mesh position={secondPillarPosition}>
          <boxGeometry attach="geometry" args={[1, 8, 2]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

function Rails({ totalWidth }) {
  return (
    <>
      {/* top rail/guide */}
      <group>
        <mesh
          position={[0, 3.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry attach="geometry" args={[1.5, totalWidth + 3, 0.5]} />
          <meshStandardMaterial attach="material" color="whitesmoke" />
        </mesh>
        <mesh
          position={[0, 3.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry attach="geometry" args={[1.5, totalWidth + 3, 0.5]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>

      {/* bottom rail/guide */}
      <group>
        <mesh
          position={[0, -1.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry attach="geometry" args={[1.5, totalWidth + 3, 0.5]} />
          <meshStandardMaterial attach="material" color="whitesmoke" />
        </mesh>
        <mesh
          position={[0, -1.7, 0.95 - totalWidth / 80]}
          rotation={[Math.PI / 2, 0, 1.57]}
        >
          <boxGeometry attach="geometry" args={[1.5, totalWidth + 3, 0.5]} />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

function Window({ position, status, glassColorProp }) {
  const mesh = useRef(null);

  //console.log(glassColorProp);

  //IF IT IS OPENED MAKE THE WINDOWS ROTATE
  if (status) {
    return (
      <>
        {/* glass */}
        <group ref={mesh}>
          <mesh
            position={position}
            castShadow
            // rotation when you open the windows
            rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[2.85, 4.5, 0.5]} />
            <meshStandardMaterial attach="material" color={glassColorProp} />
          </mesh>
          <mesh
            position={position}
            castShadow
            // rotation when you open the windows
            rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[2.85, 4.5, 0.5]} />
            <meshBasicMaterial
              attach="material"
              color="white"
              wireframe={true}
            />
          </mesh>
        </group>

        {/* sash */}
        <group ref={mesh}>
          <mesh
            position={position}
            castShadow
            // rotation when you open the windows
            rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[3, 5, 0.25]} />
            <meshStandardMaterial attach="material" color="white" />
          </mesh>

          <mesh
            position={position}
            castShadow
            // rotation when you open the windows
            rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[3, 5, 0.25]} />
            <meshBasicMaterial
              attach="material"
              color="white"
              wireframe={true}
            />
          </mesh>
        </group>
      </>
    );
  } else {
    return (
      <>
        {/* glass */}
        <group ref={mesh}>
          <mesh
            position={position}
            castShadow
            //removed  rotation when you close the windows
            // rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[2.85, 4.5, 0.5]} />
            <meshStandardMaterial attach="material" color={glassColorProp} />
          </mesh>
          <mesh
            position={position}
            castShadow
            //removed  rotation when you close the windows
            // rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[2.85, 4.5, 0.5]} />
            <meshBasicMaterial
              attach="material"
              color="white"
              wireframe={true}
            />
          </mesh>
        </group>

        {/* sash */}
        <group ref={mesh}>
          <mesh
            position={position}
            castShadow

            //removed  rotation when you close the windows
            // rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[3, 5, 0.25]} />
            <meshStandardMaterial attach="material" color="white" />
          </mesh>
          <mesh
            position={position}
            castShadow
            //removed  rotation when you close the windows
            // rotation={[Math.PI / 1, 1.6, 0]}
          >
            <boxGeometry attach="geometry" args={[3, 5, 0.25]} />
            <meshBasicMaterial
              attach="material"
              color="white"
              wireframe={true}
            />
          </mesh>
        </group>
      </>
    );
  }
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

function FoldableGlassWindows(props) {
  //handles the style inside the component START
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
  //handles the style inside the component END

  //manage and trace the number of windows
  //console.log(props.glassColor);

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
  const windowInitialPositions = Array.from(
    { length: props.windowNumber },
    (_, index) => [
      index * windowSpacing - totalWidth / 2, // Shift windows to the left so that the center is aligned
      1, // Same Y position
      1, // shift windows inward as i add them
    ]
  );

  //manage and trace the values of windows positions
  const [windowsPositions, setWindowsPositions] = useState(
    windowInitialPositions
  );

  //manage if the windows are open or closed, this variable helps me see if i
  // should rotate the windows or not
  const [isOpened, setIsOpened] = useState(false);

  const openWindows = () => {
    if (orientationInput == "rx-lx") {
      //helps in the rotation of my windows when they open
      setIsOpened(true);
      //WINDOWS OPENED TO THE LEFT
      //manage the movement to the right of the pack of windows as the numbers change END------------------------
      if (props.windowNumber == 6) {
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            props.windowNumber - 14.5 + index * 0.7, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            1.5, // Same Z position
          ])
        );
      } else if (props.windowNumber == 5) {
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            props.windowNumber - 11.75 + index * 0.7, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            1.5, // Same Z position
          ])
        );
      } else if (props.windowNumber == 4) {
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            props.windowNumber - 9 + index * 0.7, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            1.5, // Same Z position
          ])
        );
      } else if (props.windowNumber == 3) {
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            props.windowNumber - 6.25 + index * 0.7, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            1.5, // Same Z position
          ])
        );
      } else if (props.windowNumber == 2) {
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            props.windowNumber - 3.75 + index * 0.7, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            1.5, // Same Z position
          ])
        );
      } else if (props.windowNumber == 1) {
        setWindowsPositions(
          Array.from({ length: props.windowNumber }, (_, index) => [
            props.windowNumber - 1 + index * 0.7, // Shift windows to the left so that the center is aligned
            1, // Same Y position
            1.5, // Same Z position
          ])
        );
      }
      //manage the movement to the right of the pack of windows as the numbers change END------------------------
    } else if (orientationInput == "lx-rx") {
      //helps in the rotation of my windows when they open
      setIsOpened(true);
      //WINDOWS OPENED TO THE RIGHT
      setWindowsPositions(
        Array.from({ length: props.windowNumber }, (_, index) => [
          props.windowNumber - 1 + index * 0.7, // Shift windows to the left so that the center is aligned
          1, // Same Y position
          1.5, // Same Z position
        ])
      );
    } else if (orientationInput == "") {
      //CLOSE WINDOWS if you do not select an orientation
      setWindowsPositions(windowInitialPositions);
    }
  };

  const closeWindows = () => {
    //helps in the rotation of my windows when they close
    setIsOpened(false);
    //CLOSE WINDOWS
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
            status={isOpened}
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
            Orientamento finestre:
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

export default FoldableGlassWindows;
