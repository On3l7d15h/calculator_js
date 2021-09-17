//variables con destructuring

const {buttons: btns, input: ip, change: ch, calc: c, history: ht, secHistory: section, delete: del, exit: ex, back: bc} = {
	buttons: document.querySelectorAll(".calc button"),
	input: document.querySelector(".calc input"),
	change: document.querySelector(".change"),
	calc: document.querySelector(".calc"),
	history: document.querySelector(".calcHistory"),
	secHistory: document.querySelector(".calcHistory .calcHistory_sec"),
	delete: document.querySelector(".calcHistory .delete"),
	exit: document.querySelector(".back .alert button"),
	back: document.querySelector(".back")
}

//localStorage
let items = JSON.parse(localStorage.getItem("item"));
	 if(items === null){
  		 histories = []
   } else {
  		 histories = Object.values(items);
   }

//añadir un click a cada evento con un bucle

btns.forEach((b) => {

	b.addEventListener("click", () => {
		
		b.classList.add("click");
		
		switch(b.textContent){

			case "=": {
				if(ip.value === "" || ip.value === null){
					ip.value = 0;
				} else {
					historial();
					ip.value = eval(ip.value);
				}
				break;
			}

			case "AC": {
				ip.value = "";
				break;
			}

			case "!": {
				//modal de info, abriendo
				bc.style.transform = `scale(${1})`;
				break;
			}

			default: {
				ip.value += b.textContent;
				break;
			}
		}

		setTimeout(() => {
			b.classList.remove("click")
		}, 200);
										
	})
});

//mostrando historial en tiempo real

const historial = () => {
	section.innerHTML = "";
     //para LocalStorage
     items = JSON.parse(localStorage.getItem("item"));
    	 if(items === null){
           histories = []
       } else {
           histories = Object.values(items);
       }
 
			 if(ip.value !== null && ip.value !== ""){
       histories.push(`${ip.value} = ${eval(ip.value)}`);
       localStorage.setItem("item", JSON.stringify(histories));
  
				 histories.forEach((info) => {
						section.innerHTML += `<p> ${info} </p>`
				 })
			 } else {
				 ip.value = 0;
			 }
}

//cambio para el historial
ch.addEventListener("click", () => {
	//condicional
	if(c.style.transform === `rotateY(${90}deg)`){
		c.style.transform = `rotateY(${0}deg)`;
		ht.style.transform = `rotateY(${270}deg)`;
	} else {
		c.style.transform = `rotateY(${90}deg)`;
  	ht.style.transform = `rotateY(${360}deg)`;	
	}
});

//llamando Historial
section.innerHTML = "";
histories.forEach((info) => {
	section.innerHTML += `<p> ${info} </p>`
})

//borrando LocalStorage
del.addEventListener("click", () => {
	localStorage.clear();
	let items = JSON.parse(localStorage.getItem("item"));
	if(items === null){
		histories = []
	} else {
		histories = items;
	}
	section.innerHTML = "";
	 histories.forEach((info) => {
		 section.innerHTML += `<p> ${info} </p>`
   })
});

//cerrando modal de info
ex.addEventListener("click", () => {
	bc.style.transform = `scale(${0})`;
});
