console.log('seila')

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Plano de Fundo
const background = {
   sX: 390,
   sY: 0,
   w: 275,
   h: 204,
   x: 0,
   y: canvas.height - 204,

   desenha() {
      ctx.fillStyle = '#70c5ce'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
         sprites,
         background.sX, background.sY, // Sprite X, Sprite Y
         background.w, background.h, // Tamanho do recorte na sprite
         background.x, background.y, // Posicionar no canvas X: 10px, Y: 50px
         background.w, background.h
      )

      ctx.drawImage(
         sprites,
         background.spriteX, background.spriteY, // Sprite X, Sprite Y
         background.largura, background.altura, // Tamanho do recorte na sprite
         (background.x + background.largura), background.y, // Posicionar no canvas X: 10px, Y: 50px
         background.largura, background.altura
      )
   }
}

// Chão
const chao = {
   sX: 0,
   sY: 610,
   w: 224,
   h: 112,
   x: 0,
   y: canvas.height - 112,

   desenha() {
      ctx.drawImage(
         sprites,
         chao.sX, chao.sY, // Sprite X, Sprite Y
         chao.w, chao.h, // Tamanho do recorte na sprite
         chao.x, chao.y, // Posicionar no canvas X: 10px, Y: 50px
         chao.w, chao.h
      )

      ctx.drawImage(
         sprites,
         chao.sX, chao.sY, // Sprite X, Sprite Y
         chao.w, chao.h, // Tamanho do recorte na sprite
         (chao.x + chao.w), chao.y, // Posicionar no canvas X: 10px, Y: 50px
         chao.w, chao.h
      )
   }
}

const flappyBird = {
   sX: 0,
   sY: 0,
   w: 33,
   h: 24,
   x: 10,
   y: 50,
   velocidade: 0,
   gravidade: 0.25,

   atualiza() {
      flappyBird.velocidade += flappyBird.gravidade
      console.log(flappyBird.velocidade)
      flappyBird.y += flappyBird.velocidade
   },

   desenha() {
      ctx.drawImage(
         sprites,
         flappyBird.sX, flappyBird.sY, // Sprite X, Sprite Y
         flappyBird.w, flappyBird.h, // Tamanho do recorte na sprite
         flappyBird.x, flappyBird.y, // Posicionar no canvas X: 10px, Y: 50px
         flappyBird.w, flappyBird.h
      )
   }
}

// Mensagem GetReady
const mensagemGetReady = {
   sX: 134,
   sY: 0,
   w: 174,
   h: 152,
   x: (canvas.width / 2) - 174 / 2,
   y: 50,

   desenha() {
      ctx.drawImage(
         sprites,
         mensagemGetReady.sX, mensagemGetReady.sY, // Sprite X, Sprite Y
         mensagemGetReady.w, mensagemGetReady.h, // Tamanho do recorte na sprite
         mensagemGetReady.x, mensagemGetReady.y, // Posicionar no canvas X: 10px, Y: 50px
         mensagemGetReady.w, mensagemGetReady.h
      )
   }
}

var telaAtiva = {}
function mudaParaTela(novaTela) {
   telaAtiva = novaTela
}

const Telas = {
   inicio: {
      desenha() {
         background.desenha()
         chao.desenha()
         flappyBird.desenha()
         mensagemGetReady.desenha()
      },
      click() {
         mudaParaTela(Telas.jogo)
      },
      atualiza() {

      }
   }
}

Telas.jogo = {
   desenha() {
      background.desenha()
      chao.desenha()
      flappyBird.desenha()
   },
   atualiza() {
      flappyBird.atualiza()
   }
}

function loop() {
   telaAtiva.desenha()
   telaAtiva.atualiza()

   requestAnimationFrame(loop)
}

window.addEventListener('click', () => {
   telaAtiva.click()
})

mudaParaTela(Telas.inicio)
loop()
