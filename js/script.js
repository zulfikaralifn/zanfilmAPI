function searchFilm() {
  $("#film-list").html("");

  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "28bf5d78",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let film = result.Search;

        $.each(film, function (i, data) {
          $("#film-list").append(
            `
          <div class="col-md-4">
            <div class="card mb-3">
                <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">` +
              data.Title +
              `</h5>
              <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
              <a href="#" class="card-link lihat-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">Lihat Detail</a>
                </div>
            </div>
            </div>
            `
          );
        });

        $("search-input").val("");
      } else {
        $("#film-list").html(`
            <h1 class="text-center">Film tidak ditemukan!</h1>
        `);
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchFilm();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchFilm();
  }
});

$("#film-list").on("click", ".lihat-detail", function () {
  $.ajax({
    url: "http://omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "28bf5d78",
      i: $(this).data("id"),
    },
    success: function (film) {
      if (film.Response === "True") {
        $(".modal-body").html(
          `
                  <div class="container-fluid">
                      <div class="row">
                          <div class="col-md-4">
                              <img src="` +
            film.Poster +
            `" class="img-fluid">
                          </div>
  
                          <div class="col-md-8">
                              <ul class="list-group">
                                  <li class="list-group-item"><h3>` +
            film.Title +
            `</h3></li>
                                  <li class="list-group-item">Rilis : ` +
            film.Released +
            `</li>
                                  <li class="list-group-item">Genre : ` +
            film.Genre +
            `</li>
                                  <li class="list-group-item">Sutradara : ` +
            film.Director +
            `</li>
                                  <li class="list-group-item">Aktor : ` +
            film.Actors +
            `</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              `
        );
      }
    },
  });
});
