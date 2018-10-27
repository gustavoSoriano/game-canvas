samurai = {
	x:50,
	y:0,
	altura:runBoneco[0].altura,
	largura:runBoneco[0].largura,
	gravidade:1.6,
	velocidadeQueda:0,
	forcaDoPulo:25.6,
	qntPulos:0,
	maxPulos:3,
	indexBoneco:0,
	trocaSprite: 5,

	atualiza:function(){
		this.cair() //faz o samurai cair

		/*
			se o samurai esta pisando no chão, zera o pulo e velocidade de queda 
			(para não cair mais do q o chão)
		*/
		if( this.y > chao.y - this.altura  && estadoAtual != estados.perdeu)
		{
			this.y              = chao.y - this.altura
			this.qntPulos       = 0
			this.velocidadeQueda= 0
		}

		if(estadoAtual == estados.jogando)
		{
			this.animateSprite()
		}
	},


	/*
		sempre que trocaSprite é 0 incrementamos o indexBoneco
		assim de tempo em tempo a sprite é trocada.
	*/
	animateSprite:function(){
		if( this.trocaSprite==0 )
		{
			//se indexBoneco for maior que o total de sprites dentro do array, ele volta ser 0
			( this.indexBoneco >= runBoneco.length-1 ) ? this.indexBoneco=0 : this.indexBoneco++	
			this.trocaSprite=5
		}
		else 
			this.trocaSprite--
	},


	cair:function(){
		//o samurai é puxado pra baixo a todo momento
		this.velocidadeQueda += this.gravidade
		this.y += this.velocidadeQueda
	},

	//emprega força negativa na queda, o que faz o samurai pular
	pula:function(){
		if(this.qntPulos < this.maxPulos)
		{
			this.velocidadeQueda = -this.forcaDoPulo
			this.qntPulos++
		}
	},

	desenha:function(){
		//runBoneco é um vetor de sprites, seu index é dinâmico
		runBoneco[this.indexBoneco].desenha(this.x, this.y)
	},

	reset:function(){
		this.velocidadeQueda=0
		this.y=0
	}
}
