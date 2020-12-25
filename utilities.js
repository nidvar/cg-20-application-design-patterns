const timeoutDelayFunction = (any_func, delay)=>{
    let timeoutId;
    return (...params)=>{
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(()=>{
            any_func.apply(null, params)
        },delay)
    }
}



const display_chosen_movie = async (destination_element, imdb_movieid)=>{
    const response = await axios.get(`http://www.omdbapi.com/`,{
        params:{
            apikey: api_key,
            i: imdb_movieid
        }
    })
    const result = response.data

    destination_element.innerHTML = `
    <div>
        <h2>${result.Title} (${result.Year})</h2>
        <p>${result.Runtime} | ${result.Genre} | ${result.Released}</p>
        <img class='single_image' src='${result.Poster}'>
        <p>${result.Plot}</p>
        <p><strong>Director:</strong> ${result.Director}</p>
        <p><strong>Actors:</strong> ${result.Actors}</p>
        <p><strong>Writers:</strong> ${result.Writer}</p>
        <p><strong>Awards:</strong> ${result.Awards}</p>
    </div>
    `
}

