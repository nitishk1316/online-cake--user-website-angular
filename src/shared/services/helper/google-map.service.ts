import { Inject, Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import {} from 'google-maps';
import { environment } from 'src/environments/environment';
declare var google: any;

export interface GeoMapResponse {
	lat: number;
	lng: number;
	name: string;
	country: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
	private placeName = new Subject<GeoMapResponse>();
	public placeName$ = this.placeName.asObservable();

	private url = 'https://maps.googleapis.com/maps/api/js?key=';
	private geocoder;
	constructor(
		private ngZone: NgZone
	) { }

	/**
	 * Load google map script
	 * @param callback
	 */
	loadGoogleMaps(callback): void {
		const id = 'google-map';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.url + environment.MAP_KEY;
      script.id = id;
      if (callback) {
        script.addEventListener('load',(e) => {
					callback(null, e);
				}, false);
			}
      document.head.appendChild(script);
		} else
			callback(null, null);
	}

	geocode(location: google.maps.LatLng) {
		if (!this.geocoder) {
			this.geocoder = new google.maps.Geocoder();
		}
		this.geocoder.geocode({ location: location }, (results, status) => {
			// need to manually trigger ngZone because "geocode" callback is not picked up properly by Angular
			this.ngZone.run(() => {
				let data: GeoMapResponse = { lat: location.lat(), lng: location.lng(), name: null, country: null }
				if (status === google.maps.GeocoderStatus.OK) {
					data.name = results[0].formatted_address
					results[0].address_components.forEach(element => {
						const c = element.types.find((c: string) => c == "country");
						if (c) data.country = element.short_name;
					});
					this.placeName.next(data)
				} else {
					this.placeName.next(data);
				}
			});
		});
  }

/**
	 * Set market on map
	 * @param latitude
	 * @param longitude
	 */
	setMarker(googleMap, latitude: number, longitude: number) {
		const center = {
			lat: latitude,
			lng: longitude,
		}
		googleMap.setCenter(center);
		const marker = new google.maps.Marker({
			position: center,
			map: googleMap,
			draggable: true,
		});
		marker.addListener("dragend", (evt) => {
			var latlng = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
			this.geocode(latlng);
		});
	}
}
