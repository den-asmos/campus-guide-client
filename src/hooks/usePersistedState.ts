import { useEffect, useState } from "react";

export const usePersistedState = <T>(
	key: string,
	initialValue: T,
	options?: {
		serialize?: (value: T) => string;
		deserialize?: (value: string) => T;
	},
): [T, (value: T | ((prev: T) => T)) => void, () => void] => {
	const serialize = options?.serialize ?? JSON.stringify;
	const deserialize = options?.deserialize ?? JSON.parse;

	const [state, setState] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? deserialize(item) : initialValue;
		} catch (error) {
			console.warn(`Error loading ${key} from localStorage:`, error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, serialize(state));
		} catch (error) {
			console.warn(`Error saving ${key} to localStorage:`, error);
		}
	}, [key, state, serialize]);

	const clear = () => {
		localStorage.removeItem(key);
		setState(initialValue);
	};

	return [state, setState, clear];
};

export const usePersistedCountdown = (
	key: string,
	defaultDuration: number = 60,
) => {
	const expiryKey = `${key}Expiry`;

	const [countdown, setCountdown] = useState(() => {
		const expiryTime = localStorage.getItem(expiryKey);
		if (!expiryTime) {
			return 0;
		}

		const remainingTime = Math.floor(
			(parseInt(expiryTime) - Date.now()) / 1000,
		);
		return remainingTime > 0 ? remainingTime : 0;
	});

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => {
				const newCountdown = countdown - 1;
				setCountdown(newCountdown);

				if (newCountdown > 0) {
					const expiryTime = Date.now() + newCountdown * 1000;
					localStorage.setItem(expiryKey, expiryTime.toString());
				} else {
					localStorage.removeItem(expiryKey);
				}
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [countdown, expiryKey]);

	const start = (duration: number = defaultDuration) => {
		const expiryTime = Date.now() + duration * 1000;
		localStorage.setItem(expiryKey, expiryTime.toString());
		setCountdown(duration);
	};

	const reset = () => {
		localStorage.removeItem(expiryKey);
		setCountdown(0);
	};

	return {
		countdown,
		start,
		reset,
		isActive: countdown > 0,
	};
};
