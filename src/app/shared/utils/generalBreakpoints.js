export const valuePx = {
	mobileS: 309,
	mobileM: 375,
	mobileL: 463,
	tabletS: 750,
	tabletM: 830,
	tabletL: 962,
	laptopS: 1124,
	laptopM: 1248,
	laptopL: 1440,
	desktop: 2560,
};

export const size = {
	mobileS: `${valuePx.mobileS}px`,
	mobileM: `${valuePx.mobileM}px`,
	mobileL: `${valuePx.mobileL}px`,
	tabletS: `${valuePx.tabletS}px`,
	tabletM: `${valuePx.tabletM}px`,
	tabletL: `${valuePx.tabletL}px`,
	laptopS: `${valuePx.laptopS}px`,
	laptopM: `${valuePx.laptopM}px`,
	laptopL: `${valuePx.laptopL}px`,
	desktop: `${valuePx.desktop}px`,
};

export const device = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tabletS: `(max-width: ${size.tabletS})`,
	tabletM: `(max-width: ${size.tabletM})`,
	tabletL: `(max-width: ${size.tabletL})`,
	laptopS: `(max-width: ${size.laptopS})`,
	laptopM: `(max-width: ${size.laptopM})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
};
