<script lang="ts">
  import { toRefs } from '@vueuse/core'
  import { defineComponent, reactive } from 'vue'
  import { Book } from '~/types/index'
  import { v4 as uuidv4 } from 'uuid'

  export default defineComponent({
    setup: (props) => {
      const state = reactive({
        book: {
          id: uuidv4(),
          title: '',
          authors: [] as string[],
          isbns: [] as string[],
          page_count: 0,
          thumbnail: '',
        } as Book,
        newBook: {} as Book,
      })

      const addAuthor = (e: Event) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        if (target) {
          let val = target.value.trim()
          if (val.length > 0) {
            state.book.authors.push(val)
            target.value = ''
          }
        }
      }

      const removeAuthor = (index: number) => {
        state.book.authors.splice(index, 1)
      }

      const removeLastAuthor = (e: Event) => {
        if ((e.target as HTMLInputElement).value.length === 0) {
          removeAuthor(state.book.authors.length - 1)
        }
      }

      const addIsbn = (e: Event) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        if (target) {
          let val = target.value.trim()
          if (val.length > 0) {
            if (state.book.isbns) {
              state.book.isbns.push(val)
            }
            target.value = ''
          }
        }
      }

      const removeIsbn = (index: number) => {
        if (state.book.isbns) state.book.isbns.splice(index, 1)
      }

      const removeLastIsbn = (e: Event) => {
        if ((e.target as HTMLInputElement).value.length === 0) {
          if (state.book.isbns) removeIsbn(state.book.isbns.length - 1)
        }
      }

      const addNewBook = async () => {
        await fetch('/api/add-book', {
          method: 'POST',
          body: JSON.stringify({ book: state.book }),
        })
          .then((res) => {
            res.json().then((body) => {
              if (body.addedBook) {
                state.newBook = body.addedBook
                resetForm(true)
              }
            })
          })
          .catch((err) => {
            console.log(err.exception)
            console.log(err)
          })
      }

      const resetForm = (newBookAdded: Boolean = false) => {
        //reset state
        state.book = {
          id: uuidv4(),
          title: '',
          authors: [] as string[],
          isbns: [] as string[],
          page_count: 0,
          thumbnail: '',
        }

        if (newBookAdded) {
          state.newBook = {} as Book
        }
      }

      return {
        ...toRefs(state),
        addAuthor,
        removeAuthor,
        removeLastAuthor,
        addIsbn,
        removeIsbn,
        removeLastIsbn,
        addNewBook,
        resetForm,
      }
    },
  })
</script>
<template>
  <div class="[ add-book-wrapper ] [ max-width-wrapper ]">
    <form class="add-book-form">
      <h2 class="heading">Add Book</h2>
      <div class="inputs">
        <label for="title" class="input-box">
          <span class="field-name">Title *</span>
          <input
            id="title"
            type="text"
            name="book title"
            :required="true"
            v-model="book.title"
          />
        </label>
        <label for="authors" class="input-box">
          <span class="field-name">Author(s) *</span>
          <div class="list-input">
            <div
              class="input-item"
              v-for="(author, index) in book.authors"
              :key="index"
            >
              <button
                type="button"
                class="added"
                @click="removeAuthor(index)"
                :aria-label="`Remove ${author}`"
              >
                x
              </button>
              {{ author }}
            </div>
            <input
              id="authors"
              type="text"
              name="book author(s)"
              @keydown.enter="addAuthor"
              @keydown.188="addAuthor"
              @keydown.delete="removeLastAuthor"
            />
          </div>
        </label>
        <label for="isbns" class="input-box">
          <span class="field-name">ISBN(s) (10/13) *</span>
          <div class="list-input">
            <div
              class="input-item"
              v-for="(isbn, index) in book.isbns"
              :key="index"
            >
              <button
                type="button"
                class="added"
                @click="removeIsbn(index)"
                :aria-label="`Remove ${isbn}`"
              >
                x
              </button>
              {{ isbn }}
            </div>
            <input
              id="isbns"
              type="text"
              name="isbn(s)"
              @keydown.enter="addIsbn"
              @keydown.188="addIsbn"
              @keydown.delete="removeLastIsbn"
            />
          </div>
        </label>
        <label for="pageCount" class="input-box">
          <span class="field-name">Page Count *</span>
          <input
            id="pageCount"
            type="number"
            name="page count"
            :required="true"
            v-model.number="book.page_count"
          />
        </label>
        <label for="thumbnail" class="input-box">
          <span class="field-name">Thumbnail</span>
          <input
            id="thumbnail"
            type="text"
            name="thumbnail"
            v-model="book.thumbnail"
          />
        </label>
      </div>
      <div class="thumbnail">
        <img
          v-if="book.thumbnail"
          class="book-cover"
          :src="book.thumbnail"
          alt="book thumbnail"
        />
        <div v-else class="book-cover-placeholder"><h3>Book Cover</h3></div>
      </div>
      <div class="buttons">
        <button class="reset-btn btn" type="button" @click="resetForm(false)">
          Reset
        </button>
        <button class="submit-btn btn" type="submit" @click="addNewBook">
          Add Book
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .add-book-wrapper {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .add-book-form {
    display: grid;
    padding: 2rem 1rem 1rem;
    grid-template-areas: 'heading' 'thumbnail' 'inputs' 'buttons';
    row-gap: 1rem;
  }

  .add-book-form .inputs {
    grid-area: inputs;
  }

  .add-book-form .heading {
    color: var(--white);
    grid-area: heading;
    text-align: center;
  }

  .add-book-form .inputs .input-box {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
  }

  .add-book-form .inputs .input-box .input-item {
    display: inline-block;
    padding: 0 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    background-color: var(--accent-1);
    color: var(--black);
  }

  .add-book-form .inputs .input-box .input-item .added {
    padding: 0;
    border: none;
    margin-right: 0.25rem;
    appearance: none;
    background-color: var(--accent-1);
    color: var(--primary);
    cursor: pointer;
    opacity: 0.75;
  }

  .add-book-form .inputs .input-box .field-name {
    color: var(--accent-1);
    font-weight: 700;
  }

  .add-book-form .inputs .input-box input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border-radius: 0;
    color: #fff;
    font-size: 16px;
    outline: none;
  }

  .thumbnail {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    max-width: 400px;
    min-height: 300px;
    margin: 0 auto;
    border-radius: 0.5rem;
    grid-area: thumbnail;
  }

  .book-cover {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: auto;
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    transform: translateX(-50%) translateY(-50%);
  }

  @supports (object-fit: cover) {
    .book-cover {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transform: none;
    }
  }

  .book-cover-placeholder {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      to bottom,
      rgba(36, 59, 85, 0.4) 0%,
      #000000 65%,
      #000000 100%
    );
    background-blend-mode: multiply;
    color: var(--white);
  }

  .book-cover-placeholder h3 {
    font-size: 3rem;
    transform: rotate(25deg);
  }

  .buttons {
    display: flex;
    width: 100%;
    justify-content: center;
    grid-area: buttons;
  }
  .submit-btn,
  .reset-btn {
    max-width: fit-content;
    margin: 0 0.5rem;
  }

  @media all and (min-width: 800px) {
    .add-book-form {
      column-gap: 2rem;
      grid-template-areas:
        'heading heading'
        'inputs thumbnail'
        'buttons buttons';
      grid-template-columns: repeat(2, minmax(0, 50%));
    }
  }
</style>
