document.addEventListener('beforeload',e=>(
	e.target.tagName=='SCRIPT'&&e.target.hasAttribute('nomodule')&&e.preventDefault()
),true)