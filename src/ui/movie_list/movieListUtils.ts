const ARTWORK_WIDTH: number = 216;

export function calcArtworksCountWithinContainer(containerWidth: number) {
    return Math.floor(containerWidth / ARTWORK_WIDTH);
}