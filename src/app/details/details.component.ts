import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from "../housing-location";
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <article>
    <img class="listing-photo" [src]="housingLocation?.photo">
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this home</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have a WiFi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Interested in this home?</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" formControlName="lastName">

        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email">
        <button type="submit" class="primary">Apply Now</button>
      </form>
    </section>
  </article>
`,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  housingLocation: HousingLocation | undefined;
  housingService: HousingService = inject(HousingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
