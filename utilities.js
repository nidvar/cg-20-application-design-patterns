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

const movie_list = async (search)=>{
    const response = await axios.get(`http://www.omdbapi.com/`,{
        params:{
            apikey: api_key,
            s: search
        }
    })
    if(search==''){
        return []
    }
    if(response.data.Response == 'False'){
        return [{Title: 'Movie not found', Poster:''}]
    }else{
        console.log(response.data.Search)
        return response.data.Search
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
    <div class='dualbox'>
        <img class='single_image' src='${result.Poster}'>
        <div>
            <h3>${result.Title} (${result.Year})</h3>
            <p>${result.Runtime} | ${result.Genre} | ${result.Released}</p>
            <p>${result.Plot}</p>
        </div>
    </div>
            <p><strong>Director:</strong> ${result.Director}</p>
            <p><strong>Actors:</strong> ${result.Actors}</p>
            <p><strong>Writers:</strong> ${result.Writer}</p>
            <p><strong>Awards:</strong> ${result.Awards}</p>
        
    `
}

const render_list = (item)=>{
    return (`
            <div class="dropdown-content">
                <a href="#" class="dropdown-item name_from_list" id='${item.imdbID}'>
                    <img class='dropdown_image' src='${item.Poster=='N/A'?'':item.Poster}'> 
                    <p class='titlespan'>${item.Title} (${item.Year})</p>
                </a>
            </div>
        `)
}