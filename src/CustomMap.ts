export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 2,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }
  addMarker(mappable: Mappable): void {
    const markerColor = mappable.color;
    var iconColor = ''
    if (markerColor === 'yellow') {
      iconColor = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    } else {
      iconColor = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      },
      icon: {
        url: iconColor
      }

    });
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }



}