export const PRICE_OPTIONS_RENT = [
    { value: 400, label: 'CHF 400' },
    { value: 600, label: 'CHF 600' },
    { value: 800, label: 'CHF 800' },
    { value: 1000, label: "CHF 1'000" },
    { value: 1200, label: "CHF 1'200" },
    { value: 1400, label: "CHF 1'400" },
    { value: 1600, label: "CHF 1'600" },
    { value: 1800, label: "CHF 1'800" },
    { value: 2000, label: "CHF 2'000" },
    { value: 2500, label: "CHF 2'500" },
    { value: 3000, label: "CHF 3'000" },
    { value: 4000, label: "CHF 4'000" },
    { value: 5000, label: "CHF 5'000" },
    { value: 6000, label: "CHF 6'000" },
    { value: 8000, label: "CHF 8'000" },
];
export const PRICE_OPTIONS_BUY = [
    { value: 200000, label: "CHF 200'000" },
    { value: 300000, label: "CHF 300'000" },
    { value: 400000, label: "CHF 400'000" },
    { value: 500000, label: "CHF 500'000" },
    { value: 600000, label: "CHF 600'000" },
    { value: 800000, label: "CHF 800'000" },
    { value: 1000000, label: "CHF 1'000'000" },
    { value: 1500000, label: "CHF 1'500'000" },
    { value: 2000000, label: "CHF 2'000'000" },
    { value: 3000000, label: "CHF 3'000'000" },
];
export const ROOMS_OPTIONS = [
    { value: 1, label: '1 room' },
    { value: 1.5, label: '1.5 rooms' },
    { value: 2, label: '2 rooms' },
    { value: 2.5, label: '2.5 rooms' },
    { value: 3, label: '3 rooms' },
    { value: 3.5, label: '3.5 rooms' },
    { value: 4, label: '4 rooms' },
    { value: 4.5, label: '4.5 rooms' },
    { value: 5, label: '5 rooms' },
    { value: 6, label: '6 rooms' },
    { value: 7, label: '7 rooms' },
    { value: 8, label: '8+ rooms' },
];
export const SURFACE_OPTIONS = [
    { value: 20, label: '20 m²' },
    { value: 40, label: '40 m²' },
    { value: 60, label: '60 m²' },
    { value: 80, label: '80 m²' },
    { value: 100, label: '100 m²' },
    { value: 120, label: '120 m²' },
    { value: 150, label: '150 m²' },
    { value: 180, label: '180 m²' },
    { value: 200, label: '200 m²' },
    { value: 250, label: '250 m²' },
    { value: 300, label: '300 m²' },
];
export function formatSwissPrice(value) {
    return `CHF ${value.toLocaleString('de-CH')}`;
}
export function formatRoomsLabel(value) {
    return `${value} rooms`;
}
export function formatSurfaceLabel(value) {
    return `${value} m²`;
}
