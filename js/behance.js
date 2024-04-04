var behancekey = "RxPJ53OdMDUM424T6pEmJl2wYO54STtV";

var behanceAPI = function() {
	var key;
	var baseURL = "https://www.behance.net/v2/";

	function setKey(k) {
		key = k;	
	}
	
	function getProjects(user, cb) {
		var url = baseURL + "users/" + user + "/projects?api_key=" + key + "&callback=";
		$.get(url, {}, function(res, code) {
			cb(res.projects);
		}, "JSONP");
	}

	function getProjectDetails(project, cb) {
		var url = baseURL + "projects/" + project + "?api_key=" + key + "&callback=";
		$.get(url, {}, function(res, code) {
			cb(res.project);
		}, "JSONP");
	}

	return {
		setKey: setKey,
		getProjects: getProjects,
		getProjectDetails: getProjectDetails
	};
	
}();


function traducir() {
	
	var f = ['UI/UX','Information Architecture','Branding','Creative Direction','Graphic Design','Web Design','Web Development','Digital Photography','Photography','Programming, Interaction Design', 'Art Direction','Programming'];
	var r = ['Interfaz y experiencia de usuario','Arquitectura de la información','Marca','Dirección creativa','Diseño gráfico','Diseño web','Desarrollo web','Fotografía digital','Fotografía','Programación', 'Diseño de interacción','Dirección de arte','Programación'];
	var re = $.map(f, function(v,i) {
	    return new RegExp('\\b' + v + '\\b', 'g');
	});

	jQuery('tag').text(function(i,text) {
	    $.each(f,function(i,v) {
	        text = text.replace(re[i],r[i]);
	    });
	    return text;
	});
};

//-----------------------------------------------------------------

$(document).ready(function() {

	// Set behance api key
	behanceAPI.setKey(behancekey);
	
	// Get projects
	behanceAPI.getProjects("lorspi", function(projectlist) {

		// console.dir(projectlist);
		var projectHTML = "";
		for(var i=0; i<projectlist.length; i++) {
			var project = projectlist[i];

			var campos = "";
			
			for(var c=0; c<project.fields.length; c++) {
				campos +="<tag>" + project.fields[c] + "</tag>";
			}

			projectHTML += "<article class='proy-cont'> <div class='proy-img' style='background-image: url(&#39;"+ project.covers[404] +"&#39;)'></div><a class='proy-blur' href='"+ project.url +"' target='_blank' style='display: none;'></a> <div class='proy-hover'> <h2 class='proy-titulo proy-item upper-txt'><a href='"+ project.url +"' target='_blank'>"+ project.name +"</a></h2> <div class='proy-tags proy-item'> "+ campos +" </div></div></article>";
		}
		$("#projects").html(projectHTML);
		portafolio();
		traducir();
		
	});
});

/*

https://jsonviewer.stack.hu/#https://www.behance.net//v2/users/lorspi/projects?api_key=RxPJ53OdMDUM424T6pEmJl2wYO54STtV

project.covers[202]
project.url
project.fields
project.name

*/