(() =>
{
	"use strict"

	NodeList.prototype[Symbol.iterator] = [][Symbol.iterator]

	const $ = selector => document.querySelector(selector)

	function totalPrice(value)
	{	
		let price = $('.glyphicon-plus').parentNode.nextElementSibling.innerText.slice(1)
		let subTotal = value * price

		let $elSubTotal = $('.subTotal')
		$elSubTotal.innerText = "$" + subTotal.toFixed(2)

		let tax = Math.round( $('.tax').innerText.slice(1) )
		let shipping = Math.round( $('.shipping').innerText.slice(1) )

		$('.total').innerText = 
			"$" + (subTotal + tax + shipping).toFixed(2)
	}

	totalPrice($(".glyphicon-plus").previousSibling.nodeValue)

	document.querySelector('.promoCode').innerHTML = document.querySelector('#addPromo').innerHTML 

	$(".promoCode").addEventListener("click", event =>
	{
		let {target} = event

		if ( target.classList.contains('1') )
		{
			let template = $('#inputPromo')
				.content.cloneNode(true)

			target.parentNode.replaceChild( template, target )
		}

		if ( target.classList.contains('2') )
		{
			let valuePromoCode = $('.valuePromoCode').value

			let template = $('#viewPromo')
				.innerHTML

			target.parentNode.remove()
			document.querySelector('.promoCode').innerHTML = template

			$('var').innerText = valuePromoCode
		}			
		
		if ( target.classList.contains('3') )
		{	
			let template = $('#addPromo')
				.innerHTML

			target.parentNode.remove()
			document.querySelector('.promoCode').innerHTML = template
		}
	})

	let $dialogs = document.querySelectorAll('.dialog')

	for ( let $dialog of $dialogs )
	{
		$dialog.addEventListener("click", event =>
		{
			$('dialog').showModal()

			event.stopPropagation()
		})
	}

	$('body').addEventListener("click", event =>
	{
		if ( $('dialog').open )
			$('dialog').close()
	})

	let $form = $('.formCard')

	$form.addEventListener("submit", event =>
	{
  		$("#tab1").hidden = true
		$("#tab2").hidden = true
		$("#tab3").hidden = false
		$(".congrats").hidden = false

		let $ps = $('nav').querySelectorAll('p')

		for ( let $p of $ps )
			$p.style = `
				color:#989898;
				border-color: #989898;
			`

		$ps = $('.nav3').querySelectorAll('p')

		for ( let $p of $ps )
			$p.style = `
				color: black;
				border-color: black;
			`

		stopImmediatePropagation();
	})

    $form = $('.basicInfo')
	
	$form.addEventListener("submit", event =>
	{
		$(".congrats").hidden = true

		!$(".inputProduct").value 
			? $(".inputProduct").style = "border-color: red;"
			: $(".inputProduct").style = "border-color: none;"
		
		!$(".inputRoom").value
			? $(".inputRoom").style = "border-color: red;"
			: $(".inputRoom").style = "border-color: none;"
		
		!$(".inputColorMat").value
			? $(".inputColorMat").style = "border-color: red;"
			: $(".inputColorMat").style = "border-color: none;"
		
		!$(".inputPrice").value
			? $(".inputPrice").style = "border-color: red;"
			:$(".inputPrice").style = "border-color: none;"
		
		if ( !$(".inputProduct").value ||
			 !$(".inputRoom").value ||
			 !$(".inputColorMat").value ||
			 !$(".inputPrice").value )
			$('.warning').hidden = false
		else
		{
			$('.warning').hidden = true
			$('.thanks').showModal()	
		}
	})

	$(".glyphicon-minus").addEventListener("click", event =>
	{
		let {target} = event
		let quantity = target.nextSibling

		if ( quantity.TEXT_NODE != 3 ) return

		quantity.nodeValue = quantity.nodeValue - 1

		totalPrice(quantity.nodeValue)

		if ( quantity.nodeValue <= 1) 
			target.classList.add("hidden")
	})

	$(".glyphicon-plus").addEventListener("click", event =>
	{
		let {target} = event
		let quantity = target.previousSibling

		if ( quantity.TEXT_NODE != 3 ) return


		if ( quantity.nodeValue == 1 ) 
			target
				.previousElementSibling
				.classList.remove("hidden")
			
		quantity.nodeValue = quantity.nodeValue * 1 + 1

		totalPrice(quantity.nodeValue)
	})

	$(".remove").addEventListener("click", event =>
	{
		let {target} = event
		let quantity = target.parentNode

		target.tagName == "SPAN"
			? quantity.parentNode.remove()
			: quantity.remove()

		$('.subTotal').innerText = "$0.00"
		$('.total').innerText = "$0.00"

	})

	$(".page1").addEventListener("click", event =>
	{
		$("#tab1").hidden = true
		$("#tab2").hidden = false
		$("#tab3").hidden = true
		$(".congrats").hidden = true

		let $ps = $('nav').querySelectorAll('p')

		for ( let $p of $ps )
			$p.style = `
				color:#989898;
				border-color: #989898;
			`

		$ps = $('.nav2').querySelectorAll('p')

		for ( let $p of $ps )
			$p.style = `
				color: black;
				border-color: black;
			`
	})

})()