import pl from "/img/img pl.svg";

const TrendingSection = ({ trendingMovies }) => {
  return (
    <div className="flex flex-wrap justify-center place-items-center max-w-[98vw]">
      {Array.from({ length: 5 }).map((_, index) => {
        const movie = trendingMovies[index];
        return (
          <div
            key={movie?.$id || index}
            className="flex place-items-center justify-center lg:basis-1/5 basis-1/3"
          >
            <p
              className="font-bold text-[24vw] lg:text-[15vw]"
              style={{
                WebkitTextStroke: "1px #6c7c9e",
                color: "transparent",
              }}
            >
              {index + 1}
            </p>
            {movie ? (
              movie.poster_url != "https://image.tmdb.org/t/p/w500null" ? (
                <img
                  src={movie.poster_url}
                  alt="poster"
                  className="w-18 h-26 rounded-2xl sm:w-28 sm:h-42 shadow-black -translate-x-5 sm:-translate-x-8"
                />
              ) : (
                <div className="bg-[#1d2129ee] sm:bg-[#1a1a25ee] place-items-center w-18 h-26 rounded-2xl sm:w-28 sm:h-42 shadow-black -translate-x-5 sm:-translate-x-8">
                  <div className="w-fit h-full flex place-items-center">
                    <img src={pl} className="w-8 h-8" />
                  </div>
                </div>
              )
            ) : (
              <div
                className="animate-pulse w-18 h-26 rounded-2xl sm:w-28 sm:h-42 shadow-black -translate-x-5 sm:-translate-x-8"
                style={{ backgroundColor: "#7a8e8d" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TrendingSection;