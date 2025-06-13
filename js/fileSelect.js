let allFiles = [];

$(document).ready(() => {
  $(window).on("dragenter dragover drop", function (event) {
    event.preventDefault();
    event.stopPropagation();
  });

  $("#dropZone")
    .$(this)
    .on("mouseenter mouseleave", function (event) {
      if (event.type === "mouseenter") $(this).addClass("border-primary");
      else $(this).removeClass("border-primary");
    });

  $("#dropZone").on("dragenter dragover dragleave drop", function (event) {
    if (event.type === "dragover") $(this).addClass("dragover");
    else if (event.type === "dragleave") $(this).removeClass("dragover");
  });

  $("#dropZone").on("drop", function (event) {
    event.preventDefault();
    $(this).removeClass("dragover");
    if (event.originalEvent.dataTransfer.files.length > 0)
      handleFiles(event.originalEvent.dataTransfer.files);
  });

  $("#dropZone").on("click", function (event) {
    if (event.originalEvent.dataTransfer.files.length > 0)
      handleFiles(event.originalEvent.dataTransfer.files);
  });

  function handleFiles(newFiles) {
    const fileArray = Array.from(newFiles);

    const existingFileNames = new Set(allFiles.map((f) => f.name));
    const newUniqueFiles = fileArray.filter(
      (file) => !existingFileNames.has(file.name)
    );

    allFiles = allFiles.concat(newUniqueFiles);

    // Show the list of file names
    $("#file-list").innerHTML = allFiles
      .map((file) => `<span>${file.name}</span>`)
      .join("");

    // Optional: trigger your processing logic
    if (typeof readFiles === "function") {
      readFiles(allFiles);
    }
  }
});
