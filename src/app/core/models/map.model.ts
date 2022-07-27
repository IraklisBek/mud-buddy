export interface Marker {
    position: {
        lat: number,
        lng: number,
    },
    label: {
        color: 'red',
        text: string,
    },
    title: string,
    // options: { animation: google.maps.Animation.BOUNCE },
}