async function enviarScript(scriptText){
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`)
	
	if(!textarea) throw new Error("Não há uma conversa aberta")
	
	for(const line of lines){
		console.log(line)
	
		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', {bubbles: true}));
	
		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);
		
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}
	
	return lines.length;
}

enviarScript(`
Me caías bien
Nos vemos del otro lado
Fuiste un buen amigo
Nunca te lo dije lo suficiente
Pero te voy a extrañar
Gracias por estar ahí
🪦
Han pasado dos meses desde la ultima vez que hablamo
aun no puedo creer que te hayas ido
siempre me molestaron tus sermones de pastor
nunca pensé que llegaría a extrañarlos
La vida ya no es lo mismo sin vos.
Siempre tuve la ilusión de volver a verte y conocer a tu hija
pero ahora es demasiado tarde 🥺
Un año ha pasado pero aun no se hace más fácil
Dicen que el tiempo todo lo cura
Pero aún siento tu pérdida como si hubiera sido ayer
Aun tengo pesadillas
He rotado por muchos empleos. Mi desconcentración no me permite trabajar
intenté trabajar como domiciliario pero fracasé
Estoy yendo a terapia para superar tu pérdida. Pero por medio de la EPS todo es muy mediocre
La gente no para de tratar de ayudarme pero es que no puedo superarlo
Diez años desde tu partida.
Logré encontrar mi catarsis escribiendo
un conocido envió en secreto a una editorial el libro que escribí inspirado en vos
se convirtió en un best seller
ahora vivo rodeado de lujos pero siento el mismo vacío en el alma
Ya voy por mi segundo divorcio
Mis sobrinas son las unicas que dan un poco de luz en medio de toda esta oscuridad
pero me he apardado mucho de mi familia
ahora vivo solo en un pueblo llamado la cumbre
a veces Diana viene a visitarme con la niña. Eso me da un poco de paz.
Pero pasan muchos meses en los que estoy solo
es mi culpa supongo. Yo decidí alejarme de todo el mundo.
20 años han pasado
Creo que estoy listo
Lo he pensado mucho
la idea ha dado muchas vueltas en mi cabeza
Creo que ya estoy listo para ir a buscarte. No aguanto mas esta vida terrenal
Ya me he despedido de todos
he dejado mis asuntos en orden
Avril y Maria José van a heredar mis propiedades y mi dinero
Ya no quiero estar en esta tierra sin vos.
Nos vemos al otro lado del tunel
`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error)