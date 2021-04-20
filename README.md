Mortgage overpayment calculator using React and D3

Link to the original app:
http://paulhoughton.github.io/mortgage/

## Installation

Clone the repo and install the dependencies using

```bash
npm install
```

## Usage
After installing the dependencies, run the program with 

```bash
npm run start
```

and open to your localhost:3000

## Featured Flags

actual-payment-form:  This flag is the root flag for this project that other feature flags will use as a prerequisite.  While on, all featured flags that involve actual payment of morgage will be displayed if their flags are on as well. Users will be able to input the morgage they paid for for that year on a form.  The data from the form will be displayed on the table and/or progress bar.  If this flag is turned off, the user will no longer be able to see: actual payment form, actual data on the table, and no progress bar. The app will turn into its original form as seen in the link above.  
  prerequisites: none

Because the feature flags are new, actual-payment-form will be able to turn off all of the other featured flags if needed.  Because the project does not take in any users, the flag will not be able to specify which users to test the feature flag on.


actual-table: This feature flag controls information from actual-payment-form and saves the user's yearly payments for that session due to lack of database.  If this feature flag is turned off, data from actual-form will not be displayed here.  
  prerequisites: actual-payment-form (T)
        Actual-payment-form needs to be a prerequisite for this featured flag because the new table would have a column with only 0's and would not benefit the user in anyway.  The form is needed to transfer the information to this flag.

actual-progress-bar: Similar to actual-table.  Information from actual-payment-form can be displayed progressively to allow users to visually see their progress toward their mortgage. 
  prerequisites: actual-payment-form (T)
      Reasoning for this pre-requisite is same as actual-table but it will display an empty progress bar at the bottom instead.  

Why do I not have actual-table and actual-progress bar as a prerequisite for each other?

If the feature flag is needed to be turn off for one of the feature flags, users will still be able to see their progress towards their mortgage. 
