$(() => {
  $.ajax({
    url: "https://data.ny.gov/resource/9gar-4kdt.json?line_name=L&date=2017-09-13T00:00:00.000&station=BEDFORD AV",
    type: "GET",
    data: {
      "$$app_token" : "KjcbZ7I3WbjOXVJSebLTDYyAj"
    }
  }).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(_.groupBy(data, data => {
    return data.time && data.scp
  }
  ));
  })
  }
)
