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
		};

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
		};

		function AddBlog(blog){

			for (var i = 0; i < blog.length; i++) {
				var add = blog[i]
				var tradCorp = markdown.toHTML(add.corp);
				$("#titre").append('<div><a href="'+"#"+[i]+'">'+add.titre+'</a></div>');
				$("#art").append('<div id="'+[i]+'">'+tradCorp+'</div>');
				$("#art").append('<div>'+add["date"]+'</div>');
			}

		};
	
	
		function resume(blog){
	
			$("#Affcontenue").html(" ");
				for (var i = 0; i < blog.length; i++) {
		
					var baff = blog[i] 
					var ligne = $('<tr/>');
					$("<td>"+ baff["titre"] +"</td>").appendTo(ligne);
					$("<td>" + baff["date"]+ "</td>" ).appendTo(ligne);
					$('<td  name="'+ baff["titre"] +'" _id="'+baff["_id"]+'" content="'+ baff["corp"]+'">'+baff["corp"]+'</td>' ).appendTo(ligne);
					$('<th><input type="button" id='+baff["_id"]+' value="X"/></th>' ).appendTo(ligne);
					$("#Affcontenue").append( ligne ); 				
				}	
			};

		function modif(mdfTitre, mdfCorp, mdfId){
			$("#modif").append('<div>Modification</div>');
			$("#modif").append('Titre<input id="mdfTitre" type="text" value="'+mdfTitre+'">');
			$("#modif").append('Article<textarea id="mdfCorp" cols="30" rows="10">'+mdfCorp+'</textarea>');
			$("#modif").append('<button id="mdfId" name="'+mdfId+'">Valider</button>');

									
		};
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
	 });

// Click function
	$("#send").click(function(){
		article={
			"titre" : $("#Title").val(),
			"corp" : $("#Textblog").val(),
			"date" : mtn,
		}
		save();
		$("#Title").val("");
		$("#Text").html("");
		$("#Textblog").val("");
	});

// keyup function
	$("#Textblog").keyup(function(){
		var mark = markdown.toHTML($(this).val());	
		$("#Text").html(mark);
	});

// modification
	$("#Affcontenue").delegate('td', 'click', function(){
		var mdfTitre= $(this).attr("name");
		var mdfCorp= $(this).attr("content");
		var mdfId= $(this).attr("_id");
		modif(mdfTitre, mdfCorp, mdfId);
	});

	$("#modif").delegate('button','click', function(){
		 var id = $("#mdfId").attr("name")
		 var ChangeJson={ 
		 	"titre": $("#mdfTitre").val(),
		 	"corp": $("#mdfCorp").val(),
		 	"date" : mtn,
		 };
		console.log(id);
		console.log(ChangeJson)
	 	$.ajax({ 
	 		url:'http://192.168.1.50/json-db', 
	 		data: { task: "update",
	 		key: "BlogMarco",
	 		_id: id,
	 		value: JSON.stringify( ChangeJson )
	 	} 
	 }) 
	 load();
	 $("#modif").html("");
	 })

});