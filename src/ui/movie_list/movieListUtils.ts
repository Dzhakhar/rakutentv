export const DEFAULT_ARTWORK_WIDTH: number = 216;
export const ARTWORK_RATIO: number = 1.40277778;

enum Breakpoints {
    PHONE = 575.98,
    LANDSCAPE_PHONE = 767.98,
    TABLET = 991.98,
    DESKTOP = 1199.98
}

export function getArtworkWidth(containerWidth: number) {
    if (containerWidth < Breakpoints.PHONE) {
        return 100;
    } else if (containerWidth < Breakpoints.LANDSCAPE_PHONE) {
        return 120;
    } else if (containerWidth < Breakpoints.TABLET) {
        return 180;
    } else if (containerWidth < Breakpoints.DESKTOP) {
        return 200;
    } else {
        return DEFAULT_ARTWORK_WIDTH;
    }
}

export function calcArtworksCountWithinContainer(containerWidth: number) {
    return Math.floor(containerWidth / getArtworkWidth(containerWidth));
}