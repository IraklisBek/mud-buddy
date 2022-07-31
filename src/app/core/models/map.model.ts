export interface Marker {
    position: Position,
    label: {
        color: 'red',
        text: string,
    },
    title: string,
    options: { animation: number },
}

export interface Position {
    lat: number,
    lng: number,
}