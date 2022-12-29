import { Web3Storage } from 'web3.storage';

export const makeStorage = (token) => {
	return new Web3Storage({ token });
};
