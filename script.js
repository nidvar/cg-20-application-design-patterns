const api_key = '8d9d75cd'

const grab_data = async (search)=>{
    const response = await axios.get(`http://www.omdbapi.com/`,{
        params:{
            apikey: api_key,
            s: search
        }
    })

    if(response.data.Response == 'False'){
        return [{Title: 'Movie not found', Poster:''}]
    }else{
        return response.data.Search
    }
}

const execute_search =  async (e)=>{
    const response = await grab_data(e.target.value)
    document.getElementById('movie_list').innerHTML = ''
    
    for(let item of response){
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                    <img class='dropdown_image' src='${item.Poster}'> ${item.Title}
                </a>
            </div>
        `
        document.getElementById('movie_list').appendChild(div)
    }
}

document.getElementById('movie_search').addEventListener('input', timeoutDelayFunction(execute_search, 1000))

document.querySelector('body').addEventListener('click', (e)=>{
    if(!document.getElementById('movie_list').contains(e.target)){
        document.getElementById('movie_list').innerHTML=''
    }
})

grab_data();