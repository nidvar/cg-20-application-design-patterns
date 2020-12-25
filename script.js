const api_key = '8d9d75cd'
console.log(movie_data)

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


const search_function = (user_input, element_to_display_list,element_to_display_single_movie)=>{
    const execute_search =  async (e)=>{

        element_to_display_list.innerHTML = ''

        const response = await movie_list(e.target.value)
        
                        for(let item of response){
                            const div = document.createElement('div')
                            div.innerHTML = `
                                <div class="dropdown-content">
                                    <a href="#" class="dropdown-item" id='${item.imdbID}'>
                                        <img class='dropdown_image' src='${item.Poster=='N/A'?'':item.Poster}'> ${item.Title}
                                    </a>
                                </div>
                            `
                            element_to_display_list.appendChild(div)

                            document.getElementById(`${item.imdbID}`).addEventListener('click',(e)=>{
                                
                                display_chosen_movie(element_to_display_single_movie, item.imdbID)


                                user_input.value = `${item.Title}`;
                                element_to_display_list.innerHTML=''
                            })
                    
                        }




    }
    user_input.addEventListener('input', timeoutDelayFunction(execute_search, 1000))
}

search_function(document.getElementById('movie_search'), document.getElementById('movie_list'), document.getElementById('chosen_movie'))

document.querySelector('body').addEventListener('click', (e)=>{
    if(!document.getElementById('movie_list').contains(e.target)){
        document.getElementById('movie_list').innerHTML=''
    }
})

movie_list();