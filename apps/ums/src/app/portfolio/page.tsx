/* eslint-disable react/no-unknown-property -- ignore */
'use client';

import { Matrix4, type Mesh } from 'three';
import React, { use, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier';

// function Box({ ...props }): JSX.Element {
// 	const meshRef = useRef<Mesh>(null);
// 	const [hovered, setHovered] = useState(false);
// 	const [active, setActive] = useState(false);

// 	// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style -- ignore
// 	useFrame((state, delta) => ((meshRef.current as Mesh).rotation.x += delta));

// 	return (
// 		<mesh
// 			{...props}
// 			onClick={() => {
// 				setActive(!active);
// 			}}
// 			onPointerOut={() => {
// 				setHovered(false);
// 			}}
// 			onPointerOver={() => {
// 				setHovered(true);
// 			}}
// 			ref={meshRef}
// 			scale={active ? 1.5 : 1}
// 		>
// 			{/* eslint-disable-next-line react/no-unknown-property -- ignore */}
// 			<boxGeometry args={[1, 1, 1]} />
// 			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
// 		</mesh>
// 	);
// }

export default function Page(): JSX.Element {
	return (
		<div className='absolute w-dvw h-dvh top-0 left-0 '>
			<Canvas>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight
					angle={0.15}
					decay={0}
					intensity={Math.PI}
					penumbra={1}
					position={[10, 10, 10]}
				/>
				<pointLight decay={0} intensity={Math.PI} position={[-10, -10, -10]} />
				<Body position={[-1.2, 0, 0]} />
				{/* <Body position={[0, 0, 0]} /> */}
				<Body position={[1.2, 0, 0]} />
				<MouseBall position={[0, 0, 0]} />
			</Canvas>
		</div>
	);
}

function Body({ ...props }): JSX.Element {
	const meshRef = useRef<Mesh>(null);

	const size = 0.25 + Math.random() * 0.5;

	useFrame((state, delta) => ((meshRef.current as Mesh).rotation.x += delta));

	return (
		<mesh {...props} ref={meshRef}>
			<icosahedronGeometry args={[size, 1]} />
			<meshStandardMaterial color={0xffffff} flatShading />

			<mesh>
				<icosahedronGeometry args={[size, 1]} />
				<meshBasicMaterial color={0x00aaff} wireframe />

				{/* Slightly scale the wireframe mesh to ensure it's visible */}
				<primitive object={new Matrix4().makeScale(1.001, 1.001, 1.001)} />
			</mesh>
		</mesh>
	);
}

function MouseBall({ ...props }): JSX.Element {
	const meshRef = useRef<Mesh>(null);
	const rigidBody = useRef<RapierRigidBody>(null);
	const size = 0.25;
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	const handleMouseMove = (event: MouseEvent) => {
		setMousePos({
			x: (event.clientX / window.innerWidth) * 2 - 1,
			y: -((event.clientY / window.innerHeight) * 2 - 1),
		});
	};

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	useEffect(() => {
		// console.log(mousePos);

		if (rigidBody.current) {
			const position = vec3({ x: mousePos.x, y: mousePos.y, z: 0.2 });

			// While Rapier's return types need conversion, setting values can be done directly with Three.js types
			rigidBody.current.setTranslation(position, true);
		}
	}, [mousePos]);

	// useFrame((state, delta) => ((meshRef.current as Mesh).rotation.x += delta));

	return (
		<Physics debug={false}>
			<RigidBody type='kinematicPosition' ref={rigidBody} colliders='ball'>
				<mesh {...props} ref={meshRef}>
					<icosahedronGeometry args={[size, 1]} />
					<meshStandardMaterial color={0xffffff} emissive={'red'} />
					<pointLight color={'red'} intensity={10} />
				</mesh>
			</RigidBody>
		</Physics>
	);
}
