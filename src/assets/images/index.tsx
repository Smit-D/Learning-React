export const getImagePath = (imageNameWithExtension: string): string => {
	return require(`./${imageNameWithExtension}`);
};
export const menuThreeDotsDefaultIcon = getImagePath("menu-three-dots-default-icon.svg");