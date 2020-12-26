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
        return response.data.Search
    }
}

const run_comparison = ()=>{
    const left_side = document.querySelectorAll('.chosen_movie_item')
    const right_side = document.querySelectorAll('.chosen_movie2_item')
    if(left_side.length > 0 && right_side.length > 0){
        left_side.forEach((item, index)=>{
            console.log(parseInt(item.dataset.value))
            console.log(parseInt(right_side[index].dataset.value))

            console.log(`${item.dataset.value} + ${right_side[index].dataset.value}`)
            if(item.dataset.value == 'N/A' || right_side[index].dataset.value == 'N/A'){
                right_side[index].classList.add('normal')
                left_side[index].classList.add('normal')
                return
            }
            if(parseInt(item.dataset.value) > parseInt(right_side[index].dataset.value)){
                left_side[index].classList.add('win')
            }else{
                right_side[index].classList.add('win')
            }
        })
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
            <br />
            <p>${result.Plot}</p>
        </div>
    </div>
    <p><strong>Director:</strong> ${result.Director}</p>
    <p><strong>Actors:</strong> ${result.Actors}</p>
    <p><strong>Awards:</strong> ${result.Awards}</p>
    <p class=${destination_element.getAttribute('id')}_item data-value=${result.BoxOffice.replace('$', "").replace(',','').replace(',','').replace(',','')}><strong>Box Office:</strong> ${result.BoxOffice}</p>
    <p class=${destination_element.getAttribute('id')}_item data-value=${result.Metascore}><strong>Metascore:</strong> ${result.Metascore}</p>
    <p class=${destination_element.getAttribute('id')}_item data-value=${result.imdbRating}><strong>IMDb Rating:</strong> ${result.imdbRating}</p>
    <p class=${destination_element.getAttribute('id')}_item data-value=${result.imdbVotes}><strong>IMDb Votes:</strong> ${result.imdbVotes}</p>
    `
    run_comparison()
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