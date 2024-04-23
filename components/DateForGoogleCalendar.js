import { parse, formatISO } from "date-fns";

function useParseDateForGoogleCalendar(inputString) {
  // Extract the relevant parts of the input string
  console.log("parsing");
  const regex =
    /(\w+), (\w+) (\d{1,2}), (\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/;
  var matches = inputString.match(regex);

  /*Group 1: The day of the week ("Wednesday").
Group 2: The month name ("February").
Group 3: The day of the month ("14").
Group 4: The start time ("6:30 PM").
Group 5: The end time ("8:30 PM").*/
  inputString = inputString.replace(/,/g, "");
  console.log(inputString);
  inputString = inputString.split(" ");
  console.log(inputString);
  const start = inputString[3] + " " + inputString[4];
  console.log(start);
  const end = inputString[6] + " " + inputString[7];
  matches = [inputString[1], inputString[2], start, end];
  console.log(matches);

  if (!matches) {
    console.error("Invalid date format");
    return null;
  }

  const [month, day, startTime, endTime] = matches;
  console.log(month, day, startTime, endTime);

  // Assuming the event is for the current year as the year isn't specified in the string
  const year = new Date().getFullYear();

  // Parsing the start and end times into ISO 8601 format
  const parsedStartDate = parse(
    `${month} ${day}, ${year} ${startTime}`,
    "MMMM d, yyyy h:mm a",
    new Date()
  );
  const parsedEndDate = parse(
    `${month} ${day}, ${year} ${endTime}`,
    "MMMM d, yyyy h:mm a",
    new Date()
  );

  // Return the formatted ISO 8601 date strings
  return {
    startDateTime: formatISO(parsedStartDate),
    endDateTime: formatISO(parsedEndDate),
  };
}

export default useParseDateForGoogleCalendar;
