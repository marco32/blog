$(document).ready(function() {
	load();
	

	var blog;
	var article;
	console.log("yop")

	$("#send").click(function(){
		article={
			"titre" : $("#Title").val(),
			"corp" : $("#Text").val(),
		}
		blog.push(article)
		save();

	})
	 function AddBlog(tab){
	 	console.log(blog)
	 	for (var i = 0; i < tab.length; i++) {
	 		var add = tab[i]
	 		$("#titre").append('<div>'+add[i]["titre"]+'</div>');
	 		$("#art").append('<div>'+add[i]["corp"]+'</div>')
	 	}

	 }




	function save(){
		$.ajax({ 
			url:'http://192.168.1.50/json-db', 
			data: { task: "set",
					key: "BlogMarco",
			 		value: JSON.stringify(blog),
					} 
			});
	}

	function load(){
			$.ajax({ 
				url:'http://192.168.1.50/json-db', 
				data: { task: 'get',
						key: 'BlogMarco', 
						} 
					})
			.done(function(data){
				if(data != null){

					blog=JSON.parse(data);
					AddBlog(blog);
				}
			})
		}
});