import { PropsWithChildren } from 'react';

export type ColliderProps = PropsWithChildren<{
}>

export default function Collider({ children }: ColliderProps) {
	return <>
		{children}
	</>
}
