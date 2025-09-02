import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {} from 'google-maps';
import { Subscription } from 'rxjs';
import { Address, AddressType, Setting, Message } from 'src/shared/classes';
import { AddressService, SettingService } from 'src/shared/services';
import { GoogleMapService, GeoMapResponse } from 'src/shared/services/helper/google-map.service';
import { HelperService } from 'src/shared/services/helper/helper.service';
declare var google: any;

let googleMap: google.maps.Map;

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit, AfterViewInit {
  @ViewChild('gmap', { static: false }) gmap: ElementRef;
  private subAddress: Subscription;
  private subSetting: Subscription;

  public isLoading: boolean = false;
  public addressInfo: Address = {
    _id: null,
    name: null,
    flat: null,
    street: null,
    addressType: AddressType.HOME,
    address: null,
    location: {
      latitude: null,
      longitude: null
    },
    country: null
  };
  public id: number;
  public lastPage: string;
  public isEdit: boolean = false;
  public errorMessage: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private helperService: HelperService,
    private settingService: SettingService,
    private googleMapService: GoogleMapService
  ) { }

  ngAfterViewInit(): void {
    this.route.params.subscribe(param => {
      this.id = param['id'];
      this.googleMapService.loadGoogleMaps(() => {
        googleMap = new google.maps.Map(this.gmap.nativeElement, { zoom: 15, draggable: true });
        if (this.id) { this._getAddress(this.id); }
        else { this._getStoreInfo(); }

        this._setCurrentLocation();
      });
    });
    this.route.queryParams.subscribe(params => {
      this.lastPage = params['checkout'];
    });
  }

  ngOnInit(): void {
    this.googleMapService.placeName$.subscribe((data: GeoMapResponse) => {
      if (data) {
        this.addressInfo.location.latitude = data.lat;
        this.addressInfo.location.longitude = data.lng;
        this.addressInfo.address = data.name;
        this.addressInfo.country = data.country;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subAddress) { this.subAddress.unsubscribe(); }
    if (this.subSetting) { this.subSetting.unsubscribe(); }
  }

  private _getAddress(id: number) {
    this.subAddress = this.addressService.getById(id).subscribe((response: Address) => {
      this.addressInfo = response;
      this.googleMapService.setMarker(googleMap, response.location.latitude, response.location.longitude);
    });
  }

  /**
	 * Get Current MapLocation Coordinates and set to map
	 */
  private _setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
      this.googleMapService.setMarker(googleMap, position.coords.latitude, position.coords.longitude);
      });
    }
  }

  /**
	 * Get store info
	 */
  private _getStoreInfo() {
    this.isLoading = true;
    this.subSetting = this.settingService.getAllSettings().subscribe((response: Setting) => {
      this.googleMapService.setMarker(googleMap, response.location.latitude, response.location.longitude);
      this.isLoading = false;
    }, error => this.isLoading = false);
  }

  /**
	 * Add or update event
	 */
  save(): void {
    this.errorMessage = null;
    if (this.id) {
      this.isLoading = true;
      this.addressService.update(this.id, this.addressInfo).subscribe((response: Message) => {
        this.isLoading = false;
        this.helperService.successMsg(response.message);
        if (this.lastPage) this.router.navigate(['/checkout']);
        else this.router.navigate(['/address']);
      }, (error:  Message) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      });
    } else {
      this.isLoading = true;
      this.addressService.save(this.addressInfo).subscribe((response: Message) => {
        this.isLoading = false;
        this.helperService.successMsg(response.message);
        if (this.lastPage) this.router.navigate(['/checkout']);
        else this.router.navigate(['/address']);
      }, (error:  Message) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      });
    }
  }
}
