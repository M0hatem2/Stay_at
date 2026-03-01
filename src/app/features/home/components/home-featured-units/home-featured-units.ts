import { Component } from '@angular/core';
import { UnitsCard } from "../../../../shared/components/units-card/units-card";
import { AddToFav } from "../../../../shared/components/add-to-fav/add-to-fav";

@Component({
  selector: 'app-home-featured-units',
  // imports: [UnitsCard],
  templateUrl: './home-featured-units.html',
  styleUrl: './home-featured-units.scss',
  imports: [AddToFav],
})
export class HomeFeaturedUnits {

}
