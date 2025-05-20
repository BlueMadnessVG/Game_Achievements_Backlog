import { Group, Mesh, Material, Object3D } from 'three';
import type { ReactNode } from 'react';
import type { ThreeEvent } from '@react-three/fiber';

interface GroupProps {
    children?: ReactNode;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number | [number, number, number];
    onClick?: (event: ThreeEvent<MouseEvent>) => void;
}

export type GLTFResult = {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
}

export type ModelProps = GroupProps;