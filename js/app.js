$(document).ready(function() {
	// Var global

	var blog;
	var article;
	var date= new Date();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var year = date.getFullYear();
	var mtn = day+"-"+ month+"-"+year;
	
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
					resume(blog);
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
	
	
		function resume(blog){
	
		$("#Affcontenue").html(" ");
		for (var i = 0; i < blog.length; i++) {
		
			var baff = blog[i] 
			
			var ligne = $('<tr/>').data("ID",i);

			$('<td/>').html(i).appendTo(ligne);
			$("<td>"+ baff["titre"] +"</td>").appendTo(ligne);
			$("<td>" + baff["date"]+ "</td>" ).appendTo(ligne);
			$('<td><input name='+ baff["titre"] +' id='+baff["_id"]+' type="text" value="" date="'+ baff["date"]+' " placeholder="Réecrire l\'article"">'+ baff["corp"]+'</td>' ).appendTo(ligne);
			$('<th><input type="button" id='+baff["_id"]+' value="X"/></th>' ).appendTo(ligne);
			$("#Affcontenue").append( ligne ); 				
		}	
	}
	// Appel function
	load();
// Delegate
 $("#Affcontenue").delegate('th', 'click', function(){
	 	 var supp = $(this).attr("id");
	  	$.ajax({ 
	  		url:'http://192.168.1.50/json-db', 
	  		data: { task: "delete",
	  		key: "BlogMarco",
	  		_id: supp,
	  	} 
	  });	 
	 	load();
	 })

	$("#Affcontenue").delegate('input', 'change', function(){
		 var id = $(this).attr("id")
		 var ChangeJson={ 
		 	"titre": $(this).attr("name"),
		 	"corp": $(this).val(),
		 	"date" : $(this).attr("date")
		 };
		
	 	$.ajax({ 
	 		url:'http://192.168.1.50/json-db', 
	 		data: { task: "update",
	 		key: "BlogMarco",
	 		_id: id,
	 		value: JSON.stringify( ChangeJson )
	 	} 
	 }) 
	 load();
	})

	// Click function
	$("#send").click(function(){
		article={
			"titre" : $("#Title").val(),
			"corp" : $("#Text").html(),
			"date" : mtn,
		}
		save();
		$("#Title").val("");
		$("#Text").html("");
		$("#Textblog").val("");
	})

// keyup function
	$("#Textblog").keyup(function(){
		var mark = markdown.toHTML($(this).val());	
		$("#Text").html(mark);
	})
// modification


});