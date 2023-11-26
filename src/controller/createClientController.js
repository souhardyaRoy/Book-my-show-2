const {
  City,
  Shows,
  ActiveMovies,
  Theatre,
  Dates,
  Language,
} = require("../model/schema");

const getshowsByCitiesandDates = async (req, res) => {
  try {
    const { city, theater, date } = req.query;

    // Find the selected city in raw format
    const selectedCity = await City.findOne({
      where: { city_name: city },
      raw: true,
    });

    if (!selectedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    console.log("Selected City:", selectedCity);

    // Find the selected theater in the specified city in raw format
    const selectedTheater = await Theatre.findOne({
      where: { theater_name: theater, city_id: selectedCity.city_id },
      attributes: ["theater_id", "theater_name", "city_id"], // Specify the columns explicitly
      raw: true,
    });

    if (!selectedTheater) {
      return res
        .status(404)
        .json({ error: "Theater not found in the specified city" });
    }

    console.log("Selected Theater:", selectedTheater);

    // Find the selected date in raw format
    const selectedDate = await Dates.findOne({
      where: { available_date: new Date(date) },
      raw: true,
    });

    if (!selectedDate) {
      return res.status(404).json({ error: "Date not found" });
    }

    console.log("Selected Date:", selectedDate);

    // Find shows for the specified city, theater, and date in raw format
    const shows = await Shows.findAll({
      where: {
        // city_id: selectedCity.city_id,
        theater_id: selectedTheater.theater_id,
        date_id: selectedDate.date_id,
      },
      include: [
        { model: ActiveMovies, attributes: ["movie_id", "movie_name"] },
        {
          model: Theatre,
          attributes: ["theater_id", "theater_name", "city_id"],
        },
        { model: Dates, attributes: ["date_id", "available_date"] },
        { model: Language, attributes: ["language_id", "language_name"] },
      ],
      raw: true,
    });

    if (shows.length == 0) {
      return res.status(404).json({
        message:
          "there is no show on the specific date for the specific theater",
      });
    }
    console.log(shows);
    // Extract relevant information from the shows
    const showsInfo = shows.map((show) => ({
      movie_name: show["active_movie.movie_name"],
      show_time: show.show_time,
      language: show["language.language_name"],
      date: date,
      city: city,
    }));

    res.status(200).json({ shows: showsInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getshowsByCitiesandDates };
