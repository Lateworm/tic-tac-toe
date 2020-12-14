<template>
  <div id="app">
    <HelloWorld :msg="message"/>

    <div class='board'>
      <button v-for='(val, key) in boardState' :key='key' @click='getHumanMove(key)' :class="key" :disabled='val || gameOver'>
        <span>{{val}}</span>
      </button>
    </div>

    <button @click='reset'>reset</button>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import board from '@/scripts/board.ts'
  import bot from '@/scripts/bot.ts'

  export default {
    name: 'App',

    components: {
      HelloWorld
    },

    data() {
      return {
        moveHistory: [],
        boardState: null,
        gameOver: false,
      }
    },

    created() {
      this.reset()
    },

    methods: {
      getHumanMove: function(position) {
        this.moveHistory.push({ marker: 'x', position: position })
        this.boardState = board.hydrate(this.moveHistory)

        this.gameOver = board.detectGameEnd(this.boardState)

        // this is a little crude but it'll work for MVP
        if (!this.gameOver) {
          this.getBotMove()
        }
      },

      getBotMove: function() {
        const botMove = bot.getMove(this.boardState)
        this.moveHistory.push({ marker: 'o', position: botMove})
        this.boardState = board.hydrate(this.moveHistory)

        this.gameOver = board.detectGameEnd(this.boardState)
      },

      reset: function() {
        this.boardState = board.getEmptyStateObject()
        this.moveHistory = []
        this.gameOver = false
      }
    },

    computed: {
      message: function() {
        if (this.gameOver === 'tie') {
          return 'Tie Game!'
        } else if (this.gameOver) {
          return `${this.gameOver} Wins!`
        } else {
          return 'Tic Tac Toe'
        }
      },
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  @media (prefers-color-scheme: light) {
    :root {
      --color-bg-main: hsl(212, 23%, 85%);
      --color-bg-ui: hsl(206, 23%, 95%);
      --color-main: hsl(210, 29%, 25%);
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg-main: hsl(212, 23%, 15%);
      --color-bg-ui: hsl(206, 23%, 5%);
      --color-main: hsl(210, 29%, 75%);
    }
  }

  body { margin: 0 }

  #app {
    font-family: 'Comfortaa', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-bg-main);
    color: var(--color-main);
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    color: var(--color-main);
    background-color: var(--color-bg-ui);
    border: 0;
    cursor: pointer;
  }
  button:disabled { cursor: initial }

  .board {
    display: flex;
    flex-wrap: wrap;
    width: 12rem;
    margin-bottom: 1rem;
  }
  .board button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    font-family: 'Comfortaa', sans-serif;
    font-size: 3rem;
    text-transform: uppercase;
  }
  .board button:disabled { color: var(--color-main) }

  /* cell borders within the board */
  .board button { border-right: 2px solid var(--color-bg-main) }
  .board button:nth-child(3n) { border-right: 0 }
  .board button:nth-child(n+4) { border-top: 2px solid var(--color-bg-main) }
</style>
