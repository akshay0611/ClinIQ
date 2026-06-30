export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AppointmentValidationService {
  /**
   * Validates an appointment booking request
   * @param date The selected date for the appointment
   * @param time The selected time (e.g., "10:00 AM")
   * @param doctorAvailability The doctor's available days (e.g., ["Monday", "Wednesday"])
   * @returns ValidationResult containing validation status and any errors
   */
  static validateAppointment(date: Date, time: string, doctorAvailability: string[]): ValidationResult {
    const errors: string[] = [];
    const now = new Date();

    // Parse the time string to compare hours/minutes
    // Assuming format "HH:MM AM/PM"
    const timeRegex = /^(\d{1,2}):(\d{2})\s(AM|PM)$/i;
    const match = time.match(timeRegex);

    if (!match) {
      errors.push("Invalid time format selected.");
      return { isValid: false, errors };
    }

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();

    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    // 1. Temporal Boundary Check (Cannot book in the past)
    const appointmentDateTime = new Date(date);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    if (appointmentDateTime < now) {
      errors.push("Cannot book an appointment in the past.");
    }

    // 2. Doctor Availability Check (Must be on a day the doctor is available)
    const dayOfWeek = appointmentDateTime.toLocaleDateString('en-US', { weekday: 'long' });
    if (!doctorAvailability.includes(dayOfWeek)) {
      errors.push(`Doctor is not available on ${dayOfWeek}s. Available on: ${doctorAvailability.join(', ')}.`);
    }

    // 3. Working Hours Check (Assuming standard 9 AM to 5 PM)
    if (hours < 9 || hours >= 17) {
      errors.push("Appointments can only be scheduled within working hours (9:00 AM to 5:00 PM).");
    }

    // Note: Checking against busy blocks would require server integration
    // For this mock validation pipeline, we'll assume no overlapping conflicts
    // unless simulated here.

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
