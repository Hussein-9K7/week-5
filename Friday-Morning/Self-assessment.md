# Self-Assessment Report (Sprint-2)

## 1. Title:
- **Project**: Musa Barber shop Booking Management
- **Your Name**: Hussein

## 2. Challenges and Issues:

Initially, there were some challenges related to managing booking appointments:
- **Input Validation**: It was important to ensure the validity of the entered data (such as email and phone number).
- **Handling Booking Times**: The bookings that were entered needed to be verified to ensure they were not in the past or outside of working hours.
- **Handling Time Conflicts**: If a booking overlapped with another booking for the same barber, an alert message should be displayed.

## 3. Solutions and Improvements:

To address these issues, several improvements were made to the code:
- **Input Validation**: It was ensured that all necessary inputs, such as name, email, and phone number, were provided.
- **Booking Time Validation**: The `moment-timezone` library was used to set the booking time and make sure it was between 9 AM and 6 PM.
- **Avoiding Conflicts**: An algorithm was implemented to check if there was another booking for the same barber at the same time.

### Code Example (Initial Approach):

```js 
// Code used to check the booking time
const bookingDate = moment.tz(bookingTime, "Europe/Helsinki").toDate();
const startOfWorkDay = new Date(bookingDate);
startOfWorkDay.setHours(9, 0, 0, 0);
const endOfWorkDay = new Date(bookingDate);
endOfWorkDay.setHours(18, 0, 0, 0);

const currentDate = new Date();
if (bookingDate < currentDate) {
  return res.status(400).json({ message: 'The booking time cannot be in the past.' });
}

if (bookingDate < startOfWorkDay || bookingDate > endOfWorkDay) {
  return res.status(400).json({ message: 'The booking time must be between 9 AM and 6 PM. Thank you!' });
}

**Below is the code how it can be better according to Chatgpt**

// Function to validate booking time within working hours
function isValidBookingTime(bookingDate) {
  const startOfWorkDay = moment(bookingDate).set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  const endOfWorkDay = moment(bookingDate).set({ hour: 18, minute: 0, second: 0, millisecond: 0 });

  const currentDate = moment();

  if (moment(bookingDate).isBefore(currentDate)) {
    return { isValid: false, message: 'The booking time cannot be in the past.' };
  }

  if (moment(bookingDate).isBefore(startOfWorkDay) || moment(bookingDate).isAfter(endOfWorkDay)) {
    return { isValid: false, message: 'The booking time must be between 9 AM and 6 PM.' };
  }

  return { isValid: true };
}

// Code to check if booking is valid
const bookingDate = moment.tz(bookingTime, "Europe/Helsinki");

const validation = isValidBookingTime(bookingDate);
if (!validation.isValid) {
  return res.status(400).json({ message: validation.message });
}

BR.Hussein FAdhil