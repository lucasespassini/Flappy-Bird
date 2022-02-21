const som_HIT = new Audio()
som_HIT.src = './efeitos/hit.wav'

var frames = 0
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

   atualiza() {
      const repeteEm = background.w / 2;

      if (background.x <= -repeteEm) {
         return background.x = 0
      }

      background.x -= .1
   },

   desenha() {
      ctx.fillStyle = '#70c5ce'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
         sprites,
         background.sX, background.sY, // Sprite X, Sprite Y
         background.w, background.h, // Tamanho do recorte na sprite
         background.x, background.y, // Posicionar no canvas
         background.w, background.h
      )

      ctx.drawImage(
         sprites,
         background.sX, background.sY, // Sprite X, Sprite Y
         background.w, background.h, // Tamanho do recorte na sprite
         (background.x + background.w), background.y, // Posicionar no canvas 
         background.w, background.h
      )
   }
}

// Chão
function criaChao() {
   const chao = {
      sX: 0,
      sY: 610,
      w: 224,
      h: 112,
      x: 0,
      y: canvas.height - 112,
   
      atualiza() {
         const repeteEm = chao.w / 2;

         if (chao.x <= -repeteEm) {
            return chao.x = 0
         }

         chao.x -= 1
      },
      desenha() {
         ctx.drawImage(
            sprites,
            chao.sX, chao.sY, // Sprite X, Sprite Y
            chao.w, chao.h, // Tamanho do recorte na sprite
            chao.x, chao.y, // Posicionar no canvas 
            chao.w, chao.h
         )
   
         ctx.drawImage(
            sprites,
            chao.sX, chao.sY, // Sprite X, Sprite Y
            chao.w, chao.h, // Tamanho do recorte na sprite
            (chao.x + chao.w), chao.y, // Posicionar no canvas 
            chao.w, chao.h
         )
      }
   }
   return chao
}

function fazColisao(flappyBird, chao) {
   const flappyBirdY = flappyBird.y + flappyBird.h
   const chaoY = chao.y

   if (flappyBirdY >= chaoY) {
      return true
   } else {
      return false
   }
}

function criaFlappyBird() {
   const flappyBird = {
      sX: 0,
      sY: 0,
      w: 33,
      h: 24,
      x: 10,
      y: 50,
      velocidade: 0,
      gravidade: 0.25,
      pulo: 4.6,
   
      pula() {
         flappyBird.velocidade = -flappyBird.pulo
      },
   
      atualiza() {
         if (fazColisao(flappyBird, globais.chao)) {
            som_HIT.play()

            setTimeout(() => {
               mudaParaTela(Telas.game_over)
            }, 500)
            return
         }
   
         flappyBird.velocidade += flappyBird.gravidade
         flappyBird.y += flappyBird.velocidade
      },
      
      movimentos: [
         { sX: 0, sY: 0 }, // asa pra cima
         { sX: 0, sY: 26 }, // asa no meio
         { sX: 0, sY: 52 } // asa pra baixo
      ],
      frameAtual: 0,
      atualizarFrameAtual() {
         const intervaloDeFrames = 10
         const passouIntervalo = frames % intervaloDeFrames == 0

         if (passouIntervalo) {
            const baseDoIncremento = 1
            const incremento = baseDoIncremento + flappyBird.frameAtual
            const baseRepetindo = flappyBird.movimentos.length
            flappyBird.frameAtual = incremento % baseRepetindo
         } 
      },

      desenha() {
         flappyBird.atualizarFrameAtual()
         const { sX, sY } = flappyBird.movimentos[flappyBird.frameAtual]
         ctx.drawImage(
            sprites,
            sX, sY, // Sprite X, Sprite Y
            flappyBird.w, flappyBird.h, // Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y, // Posicionar no canvas X: 10px, Y: 50px
            flappyBird.w, flappyBird.h
         )
      }
   }
   return flappyBird
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

// Mensagem Game Over
const mensagemGameOver = {
   sX: 134,
   sY: 153,
   w: 226,
   h: 200,
   x: (canvas.width / 2) - 226 / 2,
   y: 50,

   desenha() {
      ctx.drawImage(
         sprites,
         mensagemGameOver.sX, mensagemGameOver.sY, // Sprite X, Sprite Y
         mensagemGameOver.w, mensagemGameOver.h, // Tamanho do recorte na sprite
         mensagemGameOver.x, mensagemGameOver.y, // Posicionar no canvas 
         mensagemGameOver.w, mensagemGameOver.h
      )
   }
}

function criaCanos() {
   const canos = {
      w: 52,
      h: 400,
      chao: {
         sX: 0,
         sY: 169,
      },
      ceu: {
         sX: 52,
         sY: 169
      },
      espaco: 80,
      desenha() {
         canos.pares.forEach(par => {
            const yRandom = par.y
            const espacamentoEntreCanos = 100
            // Cano do céu
            const canoCeuX = par.x
            const canoCeuY = yRandom
            ctx.drawImage(
               sprites,
               canos.ceu.sX, canos.ceu.sY, // Sprite X, Sprite Y
               canos.w, canos.h, // Tamanho do recorte na sprite
               canoCeuX, canoCeuY, // Posicionar no canvas X: 10px, Y: 50px
               canos.w, canos.h
            )

            // Cano do chão
            const canoChaoX = par.x
            const canoChaoY = canos.h + espacamentoEntreCanos + yRandom
            ctx.drawImage(
               sprites,
               canos.chao.sX, canos.chao.sY, // Sprite X, Sprite Y
               canos.w, canos.h, // Tamanho do recorte na sprite
               canoChaoX, canoChaoY, // Posicionar no canvas X: 10px, Y: 50px
               canos.w, canos.h
            )

            par.canoCeu = {
               x: canoCeuX,
               y: canos.h + canoCeuY
            }
            par.canoChao = {
               x: canoChaoX,
               y: canoChaoY
            }
         }) 
      },
      temColisaoComOFlappyBird(par) {
         const cabecaDoFlappy = globais.flappyBird.y
         const peDoFlappy = globais.flappyBird.y + globais.flappyBird.h

         if (globais.flappyBird.x + globais.flappyBird.w -5 >= par.x) {
            if (cabecaDoFlappy <= par.canoCeu.y) {
               return true
            }

            if (peDoFlappy >= par.canoChao.y) {
               return true
            }
         }
         
         return false
      },
      pares: [],
      atualiza() {
         const passou100frames = frames % 100 == 0
         if (passou100frames) {
            canos.pares.push({
               x: canvas.width, 
               y: -150 * (Math.random() + 1)
            })
         }

         canos.pares.forEach(par => {
            par.x -= 2

            if (canos.temColisaoComOFlappyBird(par)) {
               som_HIT.play()
               mudaParaTela(Telas.game_over)
            }

            if (par.x + canos.w <= 0) {
               canos.pares.shift()
            }
         })
      }
   }
   return canos
}

const globais = {}
var telaAtiva = {}
function mudaParaTela(novaTela) {
   telaAtiva = novaTela

   if (telaAtiva.inicializa) {
      telaAtiva.inicializa()
   }
}

function criaPlacar() {
   const placar = {
      pontuacao: 0,
      desenha() {
         ctx.font = '35px VT323, monospace'
         ctx.textAlign = 'right'
         ctx.fillStyle = '#fff'
         ctx.fillText(placar.pontuacao, canvas.width - 20, 35)
         
      },
      atualiza() {
         const intervaloDeFrames = 100
         const passouIntervalo = frames % intervaloDeFrames == 0
         if (passouIntervalo) {
            placar.pontuacao += 1
         }
         
      }
   }
   return placar
}


const Telas = {
   inicio: {
      inicializa() {
         globais.flappyBird = criaFlappyBird()
         globais.chao = criaChao()
         globais.canos = criaCanos()
      },
      desenha() {
         background.desenha()
         globais.flappyBird.desenha()
         globais.canos.desenha()
         globais.chao.desenha()
         mensagemGetReady.desenha()
      },
      click() {
         mudaParaTela(Telas.jogo)
      },
      atualiza() {
         globais.chao.atualiza()
         background.atualiza()
      }
   },

   jogo: {
      inicializa() {
         globais.placar = criaPlacar()
      },
      desenha() {
         background.desenha()
         globais.canos.desenha()
         globais.chao.desenha()
         globais.flappyBird.desenha()
         globais.placar.desenha()
      },
      click() {
         globais.flappyBird.pula()
      },
      atualiza() {
         globais.flappyBird.atualiza()
         globais.chao.atualiza()
         background.atualiza()
         globais.canos.atualiza()
         globais.placar.atualiza()
      }
   },

   game_over: {
      desenha() {
         mensagemGameOver.desenha()
      },
      click() {
         mudaParaTela(Telas.inicio)
      },
      atualiza() {

      }
   }
}

function loop() {
   telaAtiva.desenha()
   telaAtiva.atualiza()

   frames += 1
   requestAnimationFrame(loop)
}

window.addEventListener('click', () => {
   telaAtiva.click()
})

mudaParaTela(Telas.inicio)
loop()
