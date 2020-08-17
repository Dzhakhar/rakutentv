const ratio: number = 1920 / 1680;

export function calculateContainerWidth(width: number) {
    return width / ratio;
}