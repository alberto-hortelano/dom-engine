
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type Mandatory<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type KeyEvent = {
	code: string,
	type: string,
}
