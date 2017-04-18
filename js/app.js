$(document).ready(function() {
	// Var global

	var blog;
	var article;
	var date= new Date;
	
	// My function

		function save(){
			$.ajax({ 
				url:'http://192.168.1.50/json-db', 
				data: { task: "set",
				key: "BlogMarco",
				value: JSON.stringify(article),
			} 
		});
			success:{
				alert("Mise a jour des données")
			}
		}

		function load(){
			$.ajax({ 
				url:'http://192.168.1.50/json-db', 
				data: { task: 'get',
				key: 'BlogMarco', 
			} 
		})
			.fail(function(){
				$("#art").append('<div>'+"Mise à jour en cours veuillez réessayez plus tard"+'</div>')
				$("#load").append('<div>'+"Mise à jour en cours veuillez réessayez plus tard"+'</div>')
			
			})
			.done(function(data){
				if(data != null){

					blog=JSON.parse(data);
					AddBlog(blog);
					resume();
				}
			})
		}
		function AddBlog(blog){

			for (var i = 0; i < blog.length; i++) {
				var add = blog[i]
				$("#titre").append('<div><a href="'+"#"+[i]+'">'+add.titre+'</a></div>');
				$("#art").append('<div id="'+[i]+'">'+add["corp"]+'</div>');
				$("#art").append('<div>'+add["date"]+'</div>');
			}

		}
	
	
		function resume(){
	
		$("#Affcontenue").html(" ");
		for (var i = 0; i < blog.length; i++) {
		
			var baff = blog[i] 
			i
			var ligne = $('<tr/>').data("ID",i);

			$('<td/>').html(i).appendTo(ligne);
			$("<td>"+ baff["titre"] +"</td>").appendTo(ligne);
			$("<td>" + baff["date"]+ "</td>" ).appendTo(ligne);
			$("<th>" + baff["_id"]+ "</th>" ).appendTo(ligne);
			$("#Affcontenue").append( ligne ); 				
		}	
	}
	// Appel function
	load();

	// Click function
	$("#Affcontenue").delegate('th', 'click', function(){
		 var supp = $(this).html()
	 	$.ajax({ 
	 		url:'http://192.168.1.50/json-db', 
	 		data: { task: "delete",
	 		key: "BlogMarco",
	 		_id: supp,
	 	} 
	 });	 
		load();
	})

	$("#send").click(function(){
		article={
			"titre" : $("#Title").val(),
			"corp" : $("#Text").html(),
			"date" : date,
		}
		save();
		$("#Title").val("");
		$("#Text").html("");
		$("#Textblog").val("");
	})
	$("#Textblog").keyup(function(){
		var mark = markdown.toHTML($(this).val());	
		$("#Text").html(mark);
	})

});