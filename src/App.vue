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
  import board from '@/scripts/board.js'
  import bot from '@/scripts/bot.js'

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

  :root {
    --color-bg-main: #d1d9e2;
    --color-bg-ui: #ecf0f3;
    --color-main: #2c3e50;
  }

  body {
    margin: 0;
  }

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
    background-color: var(--color-bg-ui);
    border: 0;
    cursor: pointer;
  }
  button:disabled {
    cursor: initial;
  }

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
    
    border-right: 1px solid var(--color-main);
    border-radius: 0;
    font-family: 'Comfortaa', sans-serif;
    font-size: 3rem;
    text-transform: uppercase;
  }
  .board button:disabled {
    color: var(--color-main);
  }
  .board button:nth-child(3n) {
    /* Remove borders from the right of the board */
    border-right: 0;
  }
  .board button:nth-child(n+4) {
    /* Add borders to the bottom of the board */
    border-top: 1px solid var(--color-main);
  }
</style>
