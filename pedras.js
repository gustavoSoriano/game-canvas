pedras = {
	_obs:[],
	tempoInsere: 0, //controla o tempo de inserção de obstáculos

	//cada obstáculo é um objeto
	insere:function(){
		this._obs.push({
			x:LARGURA,
			altura: Math.floor(Math.random()*(spritePedras.altura-30+1)+30)
		})
		this.tempoInsere=70+Math.floor(20 * Math.random())
	},


	/*
		A todo momento fica vireficando se precisa inserir mais pedras
		testa se houve colisão
		remove do vetor, as pedras que ja passaram pelo samurai
	*/
	atualiza:function(){
		( this.tempoInsere==0 ) ? this.insere() : this.tempoInsere--

		for( var i=0, tam=this._obs.length; i<tam; i++ )
		{
			var obs = this._obs[i]

			//move o eixo X da pedra sempre pra esquerda
			obs.x -= velocidade

			//colisão samurai com obstaculo
			if( samurai.x < obs.x + spritePedras.largura && samurai.x + samurai.largura >= obs.x && samurai.y + samurai.altura >= chao.y - spritePedras.altura)
			{
				estadoAtual = estados.perdeu
				this.resetGame()
			}
			else if( obs.x <= -spritePedras.largura )
			{
				this._obs.splice(i, 1)
				tam--
				i--
				score.value++
			}
		}
	},


	resetGame:function(){
		canvas.removeEventListener("mousedown", clique)
		setTimeout(()=>{
			canvas.addEventListener("mousedown", clique)
			clique()
		}, 3000)
	},


	limpa:function(){
		this._obs = []
	},

	desenha:function(){
		for( var i=0, tam=this._obs.length; i<tam; i++ )
		{
			if(score.value > 10) spritePedras = new Sprite(8, 25, 200, 107, "img/tubarao.png")

			//cada objeto do array recebe uma sprite (desenha da pedra)
			spritePedras.desenha( this._obs[i].x, chao.y - this._obs[i].altura )
		}
	}
}