function useParseDateForGoogleCalendar(startTime, endTime) {
	// Convert Firebase Timestamps to JavaScript Date objects
	const startDate = startTime.toDate();
	const endDate = endTime.toDate();

	// Format the dates in the way Google Calendar API expects
	const startDateTime = startDate.toISOString();
	const endDateTime = endDate.toISOString();

	return { startDateTime, endDateTime };
}
