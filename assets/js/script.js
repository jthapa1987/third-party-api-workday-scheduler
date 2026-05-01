$(document).ready(function () {
  // Display current day
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  const container = $("#timeblocks");
  const currentHour = dayjs().hour();

  // Generate time blocks (9AM–5PM)
  for (let hour = 9; hour <= 17; hour++) {
    const hourLabel = dayjs().hour(hour).format("h A");

    // Load saved event
    const savedText = localStorage.getItem("hour-" + hour) || "";

    // Determine past/present/future class
    let timeClass = "";
    if (hour < currentHour) timeClass = "past";
    else if (hour === currentHour) timeClass = "present";
    else timeClass = "future";

    // Build time block
    const block = `
      <div class="time-block" data-hour="${hour}">
        <div class="hour">${hourLabel}</div>
        <textarea class="${timeClass}">${savedText}</textarea>
        <button class="saveBtn">💾</button>
      </div>
    `;

    container.append(block);
  }

  // Save button click
  $(".saveBtn").on("click", function () {
    const block = $(this).closest(".time-block");
    const hour = block.data("hour");
    const text = block.find("textarea").val();

    localStorage.setItem("hour-" + hour, text);
  });
});
