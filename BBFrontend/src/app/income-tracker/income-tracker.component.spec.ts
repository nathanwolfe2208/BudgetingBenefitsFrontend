import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTrackerComponent } from './income-tracker.component';

describe('IncomeTrackerComponent', () => {
  let component: IncomeTrackerComponent;
  let fixture: ComponentFixture<IncomeTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Define an object to store allocations by month-year key
budgetAllocations: { [key: string]: { food: number; rent: number; bills: number; other: number } } = {};

// Current allocations for display and editing
foodAllocation = 0;
rentAllocation = 0;
billsAllocation = 0;
otherAllocation = 0;

// Method to get the unique key for the selected month and year
getMonthYearKey(): string {
  return `${this.selectedMonth}-${this.selectedYear}`;
}

previousKey: string | null = null;

resetAllocations() {
  // Save the previous month's data if it exists
  if (this.previousKey) {
    this.saveAllocations();
  }
  
  const key = this.getMonthYearKey();
  this.previousKey = key;  // Update the previous key

  if (this.budgetAllocations[key]) {
    // Load saved allocations for the new month-year selection
    const savedAllocations = this.budgetAllocations[key];
    this.foodAllocation = savedAllocations.food;
    this.rentAllocation = savedAllocations.rent;
    this.billsAllocation = savedAllocations.bills;
    this.otherAllocation = savedAllocations.other;
  } else {
    // Set default values if there are no saved allocations
    this.foodAllocation = 0;
    this.rentAllocation = 0;
    this.billsAllocation = 0;
    this.otherAllocation = 0;
  }
}


saveAllocations() {
  const key = this.getMonthYearKey();
  this.budgetAllocations[key] = {
    food: this.foodAllocation,
    rent: this.rentAllocation,
    bills: this.billsAllocation,
    other: this.otherAllocation
  };
  console.log("Saved allocations:", this.budgetAllocations);  // Debugging
}


// Call saveAllocations when user saves each allocation
updateFoodAllocation() {
  this.saveAllocations();
}

// Similarly for other allocation types:
updateRentAllocation() {
  this.saveAllocations();
}

updateBillsAllocation() {
  this.saveAllocations();
}

updateOtherAllocation() {
  this.saveAllocations();
}
