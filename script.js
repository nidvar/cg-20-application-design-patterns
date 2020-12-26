const api_key = '8d9d75cd'

const search_function = (user_input, element_to_display_list, element_to_display_single_movie)=>{
    const execute_search =  async (e)=>{
        element_to_display_list.innerHTML = ''
        const response = await movie_list(e.target.value)
            for(let item of response){
                const div = document.createElement('div')
                div.innerHTML = render_list(item);
                element_to_display_list.appendChild(div)
                div.addEventListener('click',(e)=>{
                    display_chosen_movie(element_to_display_single_movie, item.imdbID)
                    user_input.value = `${item.Title}`;
                    element_to_display_list.innerHTML=''
                })
            }
    }
    user_input.addEventListener('input', timeoutDelayFunction(execute_search, 1000))
}

search_function(document.getElementById('movie_search'), document.getElementById('movie_list'), document.getElementById('chosen_movie'))

search_function(document.getElementById('movie_search2'), document.getElementById('movie_list2'), document.getElementById('chosen_movie2'))

document.querySelector('body').addEventListener('click', (e)=>{
    if(!document.getElementById('movie_list').contains(e.target)){
        document.getElementById('movie_list').innerHTML=''
    }
})

movie_list();