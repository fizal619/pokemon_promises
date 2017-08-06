$(document).ready(function(){

var output = $('#output');
var name = " ";

function Pokemon(name, sprite) {
	this.name = name 
	this.sprite = sprite 

	this.render = function() {
		output.append($(`
					<h2>${this.name}</h2>
					<br>
					<img src="${this.sprite}"/>
		
					`))
	} 
}

$("#number").keyup(function(){

        name = $("#number").val()
})


$("button").click(function(){
 //    $.get("http://pokeapi.co/api/v2/pokemon/"+name)
	//     .done(function (data) {
	//     	var pokemon = new Pokemon(data.name, data.sprites.front_default)
	//       	pokemon.render()
	//     })
	//     .error(function (error) {
	//     	console.log(error)
	//     })
	// })
	var ArrayOfPromises = []

	fetch("http://pokeapi.co/api/v2/pokemo/")
		.then(function (data) {
			return data.json()
		})
		.then(function (data) {


			console.log('LIST OF POKEMON', data.results)

			for (var i = 0; i < data.results.length; i++) {
				
				var promise = fetch(data.results[i].url)
					.then(function(data){
						return data.json()
					})
					
					// .then(function (data) {
					// 	var pokemon = new Pokemon(data.name, data.sprites.front_default)
	    //   				pokemon.render()
					// }) 
				ArrayOfPromises.push(promise);
			}
	    
	    	Promise.all(ArrayOfPromises)
	    		.then(function (results) {
	    			console.log(results)
	    			for (var i = 0; i < results.length; i++) {
	    				var pokemon = new Pokemon(results[i].name, results[i].sprites.front_default)
	      				pokemon.render()
	    			}
	    		})

	    })
	    .catch(function(error){
	    	console.log('something went wrong', error)
	    })


	})
})

	    	
